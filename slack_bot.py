"""
Slack bot: answers policy questions and names the relevant policy.
Uses the LLM + vector index approach. Runs on your laptop via Socket Mode
(no public URL or hosting needed).

    python slack_bot.py

In Slack:  @Policy Assistant how many vacation days do I get?
           /policy how many vacation days do I get?
           or send the bot a direct message.
"""
import logging
import os
import re

import certifi

# The python.org installer on macOS ships without trusted certificates; use certifi's bundle.
os.environ.setdefault("SSL_CERT_FILE", certifi.where())

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

import policy_engine as pe

load_dotenv()
logging.basicConfig(level=logging.INFO)
app = App(token=os.environ["SLACK_BOT_TOKEN"])


def build_reply(question: str) -> tuple[str, list]:
    r = pe.llm_vector(question)
    p = r["policy"]
    blocks = [{"type": "section", "text": {"type": "mrkdwn", "text": f"*Q:* {question}\n\n{r['answer']}"}}]
    if p:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text":
            f":page_facing_up: *Relevant policy:* {p['title']}  _({p['category']} · owner: {p['department']})_\n"
            f"> {p['policy_text']}"}})
    else:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text":
            ":grey_question: *Relevant policy:* none found in the policy database."}})
    blocks.append({"type": "context", "elements": [{"type": "mrkdwn", "text":
        f"LLM + vector index · {pe.GEN_MODEL} · {r['latency_s']:.1f}s · {r['tokens']['total']} tokens"}]})
    fallback = f"{r['answer']} (Relevant policy: {p['title'] if p else 'none'})"
    return fallback, blocks


def clean(text: str) -> str:
    return re.sub(r"<@[A-Z0-9]+>", "", text or "").strip()


@app.event("app_mention")
def on_mention(event, say):
    q = clean(event.get("text"))
    thread = event.get("thread_ts") or event["ts"]
    if not q:
        say(text="Ask me a company policy question, e.g. `@Policy Assistant how many vacation days do I get?`",
            thread_ts=thread)
        return
    text, blocks = build_reply(q)
    say(text=text, blocks=blocks, thread_ts=thread)


@app.event("message")
def on_dm(event, say):
    if event.get("channel_type") != "im" or event.get("bot_id") or event.get("subtype"):
        return  # only plain direct messages from people
    text, blocks = build_reply(clean(event.get("text")))
    say(text=text, blocks=blocks)


@app.command("/policy")
def on_command(ack, command, respond):
    ack()
    q = (command.get("text") or "").strip()
    if not q:
        respond("Usage: `/policy how many vacation days do I get?`")
        return
    text, blocks = build_reply(q)
    respond(text=text, blocks=blocks, response_type="in_channel")


if __name__ == "__main__":
    pe.load_index()
    print("Policy Assistant is running. Press Ctrl+C to stop.")
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
