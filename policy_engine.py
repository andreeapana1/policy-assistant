"""
Company Policy Assistant - the three answering approaches.

1. rules_based()   : keyword + synonym scoring, no LLM, returns the policy text verbatim.
2. llm_no_index()  : the WHOLE policy database is pasted into the LLM prompt (no retrieval).
3. llm_vector()    : the question is embedded, the top-k most similar policies are fetched
                     from a vector index, and ONLY those are given to the LLM (RAG).

Every approach returns the same dictionary shape so they can be compared fairly:
    {approach, answer, policy_title, policy (dict or None), latency_s,
     tokens: {prompt, output, thinking, embedding, total}, retrieved: [...]}
"""
from __future__ import annotations

import csv
import json
import math
import os
import re
import time
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "data" / "company_policies.csv"
INDEX_PATH = ROOT / "data" / "policy_index.json"

GEN_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")
EMBED_MODEL = os.getenv("GEMINI_EMBED_MODEL", "gemini-embedding-001")
EMBED_DIM = int(os.getenv("GEMINI_EMBED_DIM", "768"))
TOP_K = int(os.getenv("VECTOR_TOP_K", "3"))

NO_POLICY_ANSWER = "I couldn't find a company policy that covers this question."


# --------------------------------------------------------------------------- data
def load_policies() -> list[dict]:
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if r.get("title")]
    for i, r in enumerate(rows, start=1):
        r["id"] = f"P{i:02d}"
    return rows


POLICIES = load_policies()
BY_TITLE = {p["title"].lower(): p for p in POLICIES}


def policy_line(p: dict) -> str:
    return f"[{p['id']}] {p['title']} (Category: {p['category']}; Owner: {p['department']}): {p['policy_text']}"


def find_policy(title: str | None) -> dict | None:
    if not title:
        return None
    t = title.strip().lower()
    if t in BY_TITLE:
        return BY_TITLE[t]
    for p in POLICIES:  # tolerate small differences such as a missing "Policy" suffix
        if t in p["title"].lower() or p["title"].lower() in t:
            return p
    return None


def estimate_tokens(text: str) -> int:
    """Rough token estimate (~4 characters per token). Used only for embedding input,
    because the embedding endpoint does not report token usage."""
    return max(1, math.ceil(len(text) / 4))


RETRY_WAIT = 0.0  # seconds spent waiting on rate limits; excluded from response times


def _start():
    return (time.perf_counter(), RETRY_WAIT)


def _result(approach, answer, policy, t0, tokens=None, retrieved=None):
    tokens = tokens or {}
    tokens.setdefault("prompt", 0)
    tokens.setdefault("output", 0)
    tokens.setdefault("thinking", 0)
    tokens.setdefault("embedding", 0)
    tokens["total"] = tokens["prompt"] + tokens["output"] + tokens["thinking"] + tokens["embedding"]
    return {
        "approach": approach,
        "answer": answer,
        "policy_title": policy["title"] if policy else None,
        "policy": policy,
        "latency_s": round(time.perf_counter() - t0[0] - (RETRY_WAIT - t0[1]), 3),
        "tokens": tokens,
        "retrieved": retrieved or [],
    }


# ------------------------------------------------------------- 1. rules-based search
STOPWORDS = set("""a an the and or but if of to in on at for from by with about as is are was were be been
being do does did doing have has had i me my we our you your he she it they them their this that these
those what which who whom whose when where why how can could may might must shall should will would
there here any some all no not only own same so than too very just also am up down out over under again
further then once get got much many more most other such into through during before after above below
between off per its itself yourself ourselves company policy policies rule rules allowed allow okay ok work working job employee employees""".split())

# Hand-written synonym rules: user word -> words that appear in the policy database.
SYNONYMS = {
    "wfh": ["remote"], "home": ["remote"], "remotely": ["remote"], "telework": ["remote"],
    "holiday": ["vacation", "holiday"], "holidays": ["vacation", "holiday"], "pto": ["vacation"],
    "annual": ["vacation", "annually"], "leave": ["leave"], "days": ["days"],
    "ill": ["sick"], "illness": ["sick"], "doctor": ["sick"],
    "funeral": ["bereavement"], "died": ["bereavement"], "death": ["bereavement"], "passed": ["bereavement"],
    "baby": ["parental"], "maternity": ["parental"], "paternity": ["parental"], "pregnant": ["parental"],
    "abroad": ["abroad"], "overseas": ["abroad"], "country": ["abroad"],
    "hacked": ["security", "incident"], "virus": ["security", "incident"], "phishing": ["security", "cybersecurity"],
    "breach": ["security", "incident"],
    "journalist": ["media"], "press": ["press", "media"], "reporter": ["media"], "interview": ["interview", "media"],
    "linkedin": ["social", "media"], "twitter": ["social", "media"], "instagram": ["social", "media"],
    "facebook": ["social", "media"],
    "course": ["training", "tuition"], "certification": ["training"], "degree": ["tuition"], "class": ["training"],
    "receipt": ["receipts", "travel"], "trip": ["travel"], "flight": ["travel"], "hotel": ["travel"],
    "buy": ["purchases", "expenses"], "purchase": ["purchases", "procurement"], "spend": ["expenses"],
    "cost": ["expenses"], "pay": ["reimbursed", "expenses"], "reimburse": ["reimbursed", "reimbursement"],
    "laptop": ["laptop", "laptops", "devices"], "computer": ["laptop", "devices", "hardware"],
    "broken": ["helpdesk", "ticket"], "breaks": ["helpdesk", "ticket"], "it": ["it"],
    "phone": ["mobile"], "car": ["vehicle", "vehicles"], "gift": ["gifts"], "gifts": ["gifts"],
    "harassed": ["harassment"], "bullying": ["harassment"], "clothes": ["dress", "attire"], "wear": ["dress", "attire"],
    "password": ["passwords"], "salary": ["promotions"], "raise": ["promotions"], "promoted": ["promotions"],
    "new": ["new", "hires"], "hire": ["hires"], "probation": ["probation"], "trial": ["probation"],
    "report": ["report", "reported"], "fraud": ["unethical", "whistleblower"], "unethical": ["unethical"],
    "badge": ["badges"], "parking": ["parking"], "warranty": ["warranty"], "return": ["returns", "return"],
    "software": ["software"], "install": ["installed", "installation"], "vpn": ["vpn"],
}


def _stem(w: str) -> str:
    for suf in ("ing", "ed", "es", "s"):
        if len(w) > 4 and w.endswith(suf):
            return w[: -len(suf)]
    return w


def _terms(text: str) -> list[str]:
    return [w for w in re.findall(r"[a-z0-9]+", text.lower()) if w not in STOPWORDS and len(w) > 1]


RULES_MIN_SCORE = 3.0  # below this the rules engine says "no policy found"


def _rules_score(q_terms: set[str], p: dict) -> float:
    title = {_stem(w) for w in _terms(p["title"])}
    body = {_stem(w) for w in _terms(p["policy_text"])}
    cat = {_stem(w) for w in _terms(p["category"])}
    score = 0.0
    for t in q_terms:
        if t in title:
            score += 3
        if t in body:
            score += 1
        if t in cat:
            score += 0.5
    return score


def rules_based(question: str) -> dict:
    t0 = _start()
    base = _terms(question)
    expanded = set(base)
    for w in base:
        expanded.update(SYNONYMS.get(w, []))
    q_terms = {_stem(w) for w in expanded}
    scored = sorted(((_rules_score(q_terms, p), p) for p in POLICIES), key=lambda x: -x[0])
    best_score, best = scored[0]
    retrieved = [{"title": p["title"], "score": s} for s, p in scored[:3]]
    if best_score < RULES_MIN_SCORE:
        return _result("rules", NO_POLICY_ANSWER, None, t0, retrieved=retrieved)
    answer = f"{best['policy_text']}"
    return _result("rules", answer, best, t0, retrieved=retrieved)


# ---------------------------------------------------------------------- Gemini client
_client = None


def client():
    global _client
    if _client is None:
        from google import genai

        key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not key:
            raise RuntimeError("GEMINI_API_KEY is missing. Put it in the .env file (see .env.example).")
        _client = genai.Client(api_key=key)
    return _client


SYSTEM_PROMPT = f"""You are the Company Policy Assistant. Answer employee questions using ONLY the
company policies provided to you. Rules:
- Base every statement strictly on the provided policy text. Do not add numbers, limits, dates,
  procedures or benefits that are not written in the policy.
- If a policy only partly answers the question, say what the policy does say and clearly state
  what it does not specify.
- If no provided policy is relevant, set policy_title to null and answer exactly:
  "{NO_POLICY_ANSWER}"
- policy_title must be copied exactly from the policy list (the single most relevant policy).
- Keep the answer to 1-3 short sentences."""

ANSWER_SCHEMA = {
    "type": "object",
    "properties": {
        "answer": {"type": "string"},
        "policy_title": {"type": "string", "nullable": True},
    },
    "required": ["answer", "policy_title"],
}


def _gen_config(system: str, schema: dict):
    from google.genai import types

    cfg = dict(
        system_instruction=system,
        temperature=0,
        response_mime_type="application/json",
        response_schema=schema,
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
    )
    level = os.getenv("GEMINI_THINKING_LEVEL", "low").strip()
    if level and level.lower() != "default":
        cfg["thinking_config"] = types.ThinkingConfig(thinking_level=level)
    return types.GenerateContentConfig(**cfg)


def _call_with_retry(fn, *args, **kwargs):
    """Retries on rate limits (HTTP 429) and temporary server errors, which are common on the free tier."""
    delay = 10
    for attempt in range(6):
        try:
            return fn(*args, **kwargs)
        except Exception as e:  # noqa: BLE001
            msg = str(e)
            retryable = any(code in msg for code in ("429", "RESOURCE_EXHAUSTED", "500", "503", "UNAVAILABLE", "overloaded"))
            if not retryable or attempt == 5:
                raise
            m = re.search(r"retry in ([\d.]+)s", msg) or re.search(r"retryDelay['\"]?: ?['\"]?(\d+)s", msg)
            wait = float(m.group(1)) + 1 if m else delay
            short = re.sub(r"\s+", " ", msg)[:300]
            print(f"   ...rate limited, waiting {wait:.0f}s and retrying  [{short}]")
            global RETRY_WAIT
            t_sleep = time.perf_counter()
            time.sleep(wait)
            RETRY_WAIT += time.perf_counter() - t_sleep
            delay *= 2


def generate_json(system: str, user: str, schema: dict = ANSWER_SCHEMA) -> tuple[dict, dict]:
    """Calls Gemini and returns (parsed_json, token_usage)."""
    c = client()
    try:
        resp = _call_with_retry(c.models.generate_content, model=GEN_MODEL, contents=user,
                                config=_gen_config(system, schema))
    except Exception as e:  # noqa: BLE001
        # Some models do not accept a thinking level -> retry once without it.
        if "thinking" in str(e).lower():
            os.environ["GEMINI_THINKING_LEVEL"] = "default"
            resp = _call_with_retry(c.models.generate_content, model=GEN_MODEL, contents=user,
                                    config=_gen_config(system, schema))
        else:
            raise
    u = resp.usage_metadata
    tokens = {
        "prompt": u.prompt_token_count or 0,
        "output": u.candidates_token_count or 0,
        "thinking": getattr(u, "thoughts_token_count", 0) or 0,
    }
    text = resp.text or "{}"
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        data = {"answer": text.strip(), "policy_title": None}
    return data, tokens


def _finish(approach, data, t0, tokens, retrieved=None):
    policy = find_policy(data.get("policy_title"))
    answer = (data.get("answer") or "").strip() or NO_POLICY_ANSWER
    return _result(approach, answer, policy, t0, tokens, retrieved)


# ------------------------------------------------------- 2. LLM without a vector index
def llm_no_index(question: str) -> dict:
    t0 = _start()
    all_policies = "\n".join(policy_line(p) for p in POLICIES)
    user = f"COMPANY POLICIES ({len(POLICIES)} total):\n{all_policies}\n\nEMPLOYEE QUESTION: {question}"
    data, tokens = generate_json(SYSTEM_PROMPT, user)
    return _finish("llm", data, t0, tokens)


# ----------------------------------------------------------- 3. LLM with a vector index
def embed(texts: list[str], task_type: str) -> list[list[float]]:
    from google.genai import types

    out = []
    for i in range(0, len(texts), 50):  # batch to stay under request limits
        batch = texts[i : i + 50]
        resp = _call_with_retry(
            client().models.embed_content,
            model=EMBED_MODEL,
            contents=batch,
            config=types.EmbedContentConfig(task_type=task_type, output_dimensionality=EMBED_DIM),
        )
        for e in resp.embeddings:
            v = e.values
            n = math.sqrt(sum(x * x for x in v)) or 1.0
            out.append([x / n for x in v])  # normalise so dot product = cosine similarity
    return out


def build_index() -> dict:
    docs = [f"{p['title']}. {p['policy_text']} Category: {p['category']}." for p in POLICIES]
    vectors = embed(docs, "RETRIEVAL_DOCUMENT")
    index = {
        "embed_model": EMBED_MODEL,
        "dim": EMBED_DIM,
        "indexing_tokens_estimate": sum(estimate_tokens(d) for d in docs),
        "items": [{"id": p["id"], "title": p["title"], "vector": [round(x, 6) for x in v]}
                  for p, v in zip(POLICIES, vectors)],
    }
    INDEX_PATH.write_text(json.dumps(index))
    return index


_index = None


def load_index() -> dict:
    global _index
    if _index is None:
        if not INDEX_PATH.exists():
            raise RuntimeError("Vector index not found. Run:  python build_index.py")
        _index = json.loads(INDEX_PATH.read_text())
    return _index


def vector_search(question: str, k: int = TOP_K) -> tuple[list[tuple[float, dict]], int]:
    idx = load_index()
    qv = embed([question], "RETRIEVAL_QUERY")[0]
    scored = []
    for item in idx["items"]:
        s = sum(a * b for a, b in zip(qv, item["vector"]))
        scored.append((s, BY_TITLE[item["title"].lower()]))
    scored.sort(key=lambda x: -x[0])
    return scored[:k], estimate_tokens(question)


def llm_vector(question: str) -> dict:
    t0 = _start()
    hits, emb_tokens = vector_search(question)
    context = "\n".join(policy_line(p) for _, p in hits)
    user = f"MOST RELEVANT COMPANY POLICIES (top {len(hits)} from vector search):\n{context}\n\nEMPLOYEE QUESTION: {question}"
    data, tokens = generate_json(SYSTEM_PROMPT, user)
    tokens["embedding"] = emb_tokens
    retrieved = [{"title": p["title"], "score": round(s, 3)} for s, p in hits]
    return _finish("vector", data, t0, tokens, retrieved)


APPROACHES = {
    "rules": ("Rules-based search", rules_based),
    "llm": ("LLM without vector index", llm_no_index),
    "vector": ("LLM with vector index", llm_vector),
}
