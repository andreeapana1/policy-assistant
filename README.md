# Company Policy Assistant

A bot that answers employee policy questions and names the relevant policy, built three ways and compared:

| Approach | How it works |
|---|---|
| Rules-based search | Keyword + synonym scoring over the policy CSV; returns the best policy verbatim. No LLM. |
| LLM without vector index | All 98 policies are placed in the prompt; Gemini answers and cites the policy. |
| LLM with vector index | Policies are embedded once (`gemini-embedding-001`); each question retrieves the top 3, and only those go to Gemini. |

- **Website** (`docs/`, served by GitHub Pages): answers, relevant policy, response time, token use and unsupported-answer rate for each approach on 22 test questions.
- **Slack bot** (`slack_bot.py`): uses the LLM + vector index approach; runs locally via Socket Mode.

## Files

| File | Purpose |
|---|---|
| `policy_engine.py` | The three approaches |
| `build_index.py` | Builds the vector index (`data/policy_index.json`) |
| `benchmark.py` | Runs all test questions through all approaches, judges support, writes `docs/results.js` |
| `ask.py` | Try one question in the terminal |
| `slack_bot.py` / `slack_manifest.yml` | Slack bot and the manifest used to create the Slack app |
| `check_setup.py` | Verifies API keys |
| `data/test_questions.json` | Test set: covered, partly covered and not-covered questions |

## Run

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # add GEMINI_API_KEY (+ Slack tokens for the bot)
python check_setup.py
python build_index.py
python benchmark.py
python slack_bot.py
```

See `SETUP_GUIDE.md` for the full step-by-step walkthrough.
