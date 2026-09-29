/**
 * Policy Assistant API — Cloudflare Worker
 *
 * Holds GEMINI_API_KEY as a private secret (never sent to the browser) and
 * answers policy questions using the same "LLM + vector index" approach as
 * policy_engine.py's llm_vector(): embed the question, retrieve the top-3
 * most similar policies from a pre-built index, then ask Gemini to answer
 * using only those policies.
 *
 * The website (docs/index.html) calls this Worker's URL instead of calling
 * Gemini directly, so the API key is never exposed in the page's JavaScript.
 */

import POLICY_DATA from "./policy-data.json";

const GEN_MODEL = "gemini-3.5-flash-lite";
const EMBED_MODEL = POLICY_DATA.embed_model; // "gemini-embedding-001"
const EMBED_DIM = POLICY_DATA.dim; // 768
const TOP_K = 3;
const NO_POLICY_ANSWER = "I couldn't find a company policy that covers this question.";
const MAX_QUESTION_LENGTH = 400;

const SYSTEM_PROMPT = `You are the Company Policy Assistant. Answer employee questions using ONLY the
company policies provided to you. Rules:
- Base every statement strictly on the provided policy text. Do not add numbers, limits, dates,
  procedures or benefits that are not written in the policy.
- If a policy only partly answers the question, say what the policy does say and clearly state
  what it does not specify.
- If no provided policy is relevant, set policy_title to null and answer exactly:
  "${NO_POLICY_ANSWER}"
- policy_title must be copied exactly from the policy list (the single most relevant policy).
- Keep the answer to 1-3 short sentences.`;

const ANSWER_SCHEMA = {
  type: "object",
  properties: {
    answer: { type: "string" },
    policy_title: { type: "string", nullable: true },
  },
  required: ["answer", "policy_title"],
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

async function embedQuery(question, apiKey) {
  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${EMBED_MODEL}`,
        content: { parts: [{ text: question }] },
        taskType: "RETRIEVAL_QUERY",
        outputDimensionality: EMBED_DIM,
      }),
    }
  );
  if (!resp.ok) {
    throw new Error(`Embedding call failed: ${resp.status} ${await resp.text()}`);
  }
  const data = await resp.json();
  const v = data.embedding.values;
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}

function vectorSearch(queryVector) {
  const scored = POLICY_DATA.policies.map((p) => {
    const score = p.vector.reduce((s, x, i) => s + x * queryVector[i], 0);
    return { score, policy: p };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, TOP_K);
}

function policyLine(p) {
  return `[${p.id}] ${p.title} (Category: ${p.category}; Owner: ${p.department}): ${p.policy_text}`;
}

async function askGemini(question, hits, apiKey) {
  const context = hits.map((h) => policyLine(h.policy)).join("\n");
  const user = `MOST RELEVANT COMPANY POLICIES (top ${hits.length} from vector search):\n${context}\n\nEMPLOYEE QUESTION: ${question}`;

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEN_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: user }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
          responseSchema: ANSWER_SCHEMA,
        },
      }),
    }
  );
  if (!resp.ok) {
    throw new Error(`Generate call failed: ${resp.status} ${await resp.text()}`);
  }
  const data = await resp.json();
  const usage = data.usageMetadata || {};
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { answer: text.trim(), policy_title: null };
  }
  return {
    answer: (parsed.answer || "").trim() || NO_POLICY_ANSWER,
    policy_title: parsed.policy_title || null,
    tokens: {
      prompt: usage.promptTokenCount || 0,
      output: usage.candidatesTokenCount || 0,
      thinking: usage.thoughtsTokenCount || 0,
    },
  };
}

function findPolicy(title) {
  if (!title) return null;
  const t = title.trim().toLowerCase();
  return (
    POLICY_DATA.policies.find((p) => p.title.toLowerCase() === t) ||
    POLICY_DATA.policies.find(
      (p) => p.title.toLowerCase().includes(t) || t.includes(p.title.toLowerCase())
    ) ||
    null
  );
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Use POST with a JSON body: { question: '...' }" }, 405, origin);
    }

    let question;
    try {
      const body = await request.json();
      question = (body.question || "").toString().trim();
    } catch {
      return json({ error: "Invalid JSON body." }, 400, origin);
    }

    if (!question) return json({ error: "Missing 'question'." }, 400, origin);
    if (question.length > MAX_QUESTION_LENGTH) {
      return json({ error: `Question too long (max ${MAX_QUESTION_LENGTH} characters).` }, 400, origin);
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return json({ error: "Server is not configured with an API key." }, 500, origin);
    }

    const t0 = Date.now();
    try {
      const queryVector = await embedQuery(question, apiKey);
      const hits = vectorSearch(queryVector);
      const { answer, policy_title, tokens } = await askGemini(question, hits, apiKey);
      const policy = findPolicy(policy_title);

      return json(
        {
          question,
          answer,
          policy: policy
            ? {
                title: policy.title,
                category: policy.category,
                department: policy.department,
                policy_text: policy.policy_text,
              }
            : null,
          latency_s: (Date.now() - t0) / 1000,
          tokens: { ...tokens, total: tokens.prompt + tokens.output + tokens.thinking },
          retrieved: hits.map((h) => ({ title: h.policy.title, score: Math.round(h.score * 1000) / 1000 })),
        },
        200,
        origin
      );
    } catch (err) {
      return json({ error: String(err.message || err) }, 502, origin);
    }
  },
};
