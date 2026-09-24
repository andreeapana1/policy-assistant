"""Builds the vector index: embeds every policy once with Gemini and saves data/policy_index.json.

    python build_index.py
"""
import policy_engine as pe

if __name__ == "__main__":
    print(f"Embedding {len(pe.POLICIES)} policies with {pe.EMBED_MODEL} ...")
    idx = pe.build_index()
    print(f"Saved {len(idx['items'])} vectors ({idx['dim']} dimensions) to {pe.INDEX_PATH.name}")
    print(f"One-time indexing cost: about {idx['indexing_tokens_estimate']} tokens")
