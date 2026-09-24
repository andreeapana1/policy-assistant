"""Checks that your .env keys work. Run this first:  python check_setup.py"""
import os

from dotenv import load_dotenv

load_dotenv()
ok = True


def status(label, good, hint=""):
    global ok
    ok &= good
    print(f"[{'OK' if good else '!!'}] {label}" + ("" if good else f"  ->  {hint}"))


status("GEMINI_API_KEY is set", bool(os.getenv("GEMINI_API_KEY")), "add it to .env")
try:
    import policy_engine as pe

    data, tok = pe.generate_json(pe.SYSTEM_PROMPT, "COMPANY POLICIES:\n" + pe.policy_line(pe.POLICIES[0]) +
                                 "\n\nEMPLOYEE QUESTION: How often are performance reviews?")
    status(f"Gemini chat model '{pe.GEN_MODEL}' answers ({tok['prompt']}+{tok['output']} tokens): {data.get('answer')}", True)
    v = pe.embed(["test"], "RETRIEVAL_QUERY")[0]
    status(f"Embedding model '{pe.EMBED_MODEL}' works ({len(v)} dimensions)", True)
except Exception as e:  # noqa: BLE001
    status("Gemini call", False, f"{type(e).__name__}: {str(e)[:300]}")

status("SLACK_BOT_TOKEN starts with xoxb-", (os.getenv("SLACK_BOT_TOKEN") or "").startswith("xoxb-") and len(os.getenv("SLACK_BOT_TOKEN")) > 20,
       "only needed for the Slack bot (step 6)")
status("SLACK_APP_TOKEN starts with xapp-", (os.getenv("SLACK_APP_TOKEN") or "").startswith("xapp-") and len(os.getenv("SLACK_APP_TOKEN")) > 20,
       "only needed for the Slack bot (step 6)")
print("\nAll good!" if ok else "\nFix the lines marked !! (Slack lines can wait until step 6).")
