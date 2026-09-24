"""
Runs every test question through all three approaches and writes the results
for the website to docs/results.js.

    python benchmark.py            # run (resumes where it stopped if interrupted)
    python benchmark.py --fresh    # throw away saved progress and start over

Measured per answer: answer text, relevant policy, response time, token use,
and whether the answer is supported by the policy database (checked by an
LLM "judge" that sees the full database; its tokens are NOT counted).
"""
import json
import os
import statistics
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import policy_engine as pe

ROOT = Path(__file__).parent
QUESTIONS = json.loads((ROOT / "data" / "test_questions.json").read_text())
CACHE = ROOT / "data" / "benchmark_progress.json"
OUT = ROOT / "docs" / "results.js"
PAUSE = float(os.getenv("REQUEST_PAUSE_S", "6"))  # free tier: keep under the requests-per-minute limit

JUDGE_PROMPT = """You are auditing a company policy chatbot. Decide whether the chatbot's
response is SUPPORTED by the policy database below.

Mark it UNSUPPORTED (supported=false) if ANY of these is true:
- it states a fact, number, limit, deadline, benefit or procedure that is not written in the database;
- it presents a policy as the answer when that policy does not actually address the question;
- it answers a question the database does not cover instead of saying no policy covers it.
Mark it SUPPORTED if every claim is backed by the database text, or if it correctly says that the
database does not cover the question (or does not specify the detail asked about).

Reply with JSON: supported (true/false) and reason (one short sentence)."""

JUDGE_SCHEMA = {
    "type": "object",
    "properties": {"supported": {"type": "boolean"}, "reason": {"type": "string"}},
    "required": ["supported", "reason"],
}


def judge(question, res):
    if res["answer"] == pe.NO_POLICY_ANSWER:
        return {"supported": True, "reason": "Declined to answer (no policy found)."}
    db = "\n".join(pe.policy_line(p) for p in pe.POLICIES)
    user = (f"POLICY DATABASE:\n{db}\n\nEMPLOYEE QUESTION: {question}\n\n"
            f"CHATBOT RESPONSE: {res['answer']}\nPOLICY CITED BY CHATBOT: {res['policy_title'] or 'none'}")
    time.sleep(PAUSE)
    data, _ = pe.generate_json(JUDGE_PROMPT, user, JUDGE_SCHEMA)
    return {"supported": bool(data.get("supported")), "reason": data.get("reason", "")}


def policy_correct(item, res):
    if item["type"] == "not_covered":
        return res["policy_title"] is None
    return res["policy_title"] in item["expected"]


def main():
    if "--fresh" in sys.argv and CACHE.exists():
        CACHE.unlink()
    progress = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    pe.load_index()  # fail early if the index is missing

    for qi, item in enumerate(QUESTIONS, 1):
        q = item["q"]
        print(f"\n[{qi}/{len(QUESTIONS)}] {q}")
        for key, (label, fn) in pe.APPROACHES.items():
            ck = f"{qi}|{key}"
            if ck in progress:
                print(f"   {label:28s} (saved)")
                continue
            if key != "rules":
                time.sleep(PAUSE)
            res = fn(q)
            res.pop("policy", None)
            res["policy_correct"] = policy_correct(item, res)
            res["judge"] = judge(q, res)
            progress[ck] = res
            CACHE.write_text(json.dumps(progress, indent=1))
            flag = "ok " if res["judge"]["supported"] else "UNSUPPORTED"
            print(f"   {label:28s} {res['latency_s']:6.2f}s {res['tokens']['total']:6d} tok  "
                  f"policy={res['policy_title']!s:32s} {flag}")

    write_results(progress)


def write_results(progress):
    rows = []
    for qi, item in enumerate(QUESTIONS, 1):
        rows.append({**item, "results": {k: progress[f"{qi}|{k}"] for k in pe.APPROACHES}})

    summary = {}
    for key, (label, _) in pe.APPROACHES.items():
        rs = [r["results"][key] for r in rows]
        nc = [r["results"][key] for r in rows if r["type"] == "not_covered"]
        lat = [r["latency_s"] for r in rs]
        summary[key] = {
            "label": label,
            "policy_accuracy": sum(r["policy_correct"] for r in rs) / len(rs),
            "unsupported_rate": sum(not r["judge"]["supported"] for r in rs) / len(rs),
            "unsupported_count": sum(not r["judge"]["supported"] for r in rs),
            "abstain_rate": (sum(r["policy_title"] is None for r in nc) / len(nc)) if nc else None,
            "avg_latency_s": statistics.mean(lat),
            "median_latency_s": statistics.median(lat),
            "avg_tokens": statistics.mean(r["tokens"]["total"] for r in rs),
            "avg_prompt_tokens": statistics.mean(r["tokens"]["prompt"] for r in rs),
        }

    idx = pe.load_index()
    data = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            "gen_model": pe.GEN_MODEL,
            "embed_model": pe.EMBED_MODEL,
            "top_k": pe.TOP_K,
            "n_policies": len(pe.POLICIES),
            "n_questions": len(rows),
            "indexing_tokens_estimate": idx.get("indexing_tokens_estimate"),
        },
        "summary": summary,
        "questions": rows,
    }
    OUT.write_text("window.RESULTS = " + json.dumps(data, indent=1) + ";\n")
    print(f"\nDone. Results written to {OUT.relative_to(ROOT)}")
    for k, s in summary.items():
        print(f"  {s['label']:28s} accuracy {s['policy_accuracy']:.0%}  unsupported {s['unsupported_rate']:.0%}  "
              f"avg {s['avg_latency_s']:.2f}s  {s['avg_tokens']:.0f} tokens")


if __name__ == "__main__":
    main()
