"""Ask one question and see all three approaches side by side.

    python ask.py "How many vacation days do I get?"
"""
import sys

import policy_engine as pe

if __name__ == "__main__":
    q = " ".join(sys.argv[1:]) or input("Question: ")
    for key, (label, fn) in pe.APPROACHES.items():
        r = fn(q)
        print(f"\n=== {label} ===")
        print(f"Answer : {r['answer']}")
        print(f"Policy : {r['policy_title'] or '-'}")
        print(f"Time   : {r['latency_s']:.2f} s   Tokens: {r['tokens']['total']}")
