# Step-by-step guide (Mac)

Total time: about 1.5–2 hours, most of it waiting. Do the steps in order.
Whenever you see a grey code box, copy the whole line into **Terminal** and press Enter.

---

## Step 1 — Get a free Gemini API key (5 min)

1. Go to **https://aistudio.google.com** and sign in with a Google account.
2. Click **Get API key** → **Create API key** → copy the key (starts with `AIza...`).
3. Keep it private. Never paste it into GitHub or Slack.

## Step 2 — Put the project on your Mac and install it (10 min)

1. Unzip `policy-assistant.zip` into your **Documents** folder, so you have `Documents/policy-assistant`.
2. Open **Terminal** (Cmd+Space → type "Terminal" → Enter).
3. Check Python:
   ```
   python3 --version
   ```
   If you see `Python 3.10` or higher, continue. If not (or a pop-up asks to install developer tools), install Python from **https://www.python.org/downloads/** and reopen Terminal.
4. Go into the project and install the packages:
   ```
   cd ~/Documents/policy-assistant
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
   You'll now see `(.venv)` at the start of the Terminal line. **Every time you open a new Terminal window later, run the `cd` and `source` lines again.**
5. Create your private settings file and open it:
   ```
   cp .env.example .env
   open -e .env
   ```
   Replace `paste-your-gemini-key-here` with your key. Save (Cmd+S) and close.
6. Test it:
   ```
   python check_setup.py
   ```
   The Gemini lines should say `[OK]`. (The two Slack lines will say `!!` for now — that's fine.)
   *If the model name is rejected*, open `.env` and change `GEMINI_MODEL` to `gemini-3.5-flash-lite`, then test again.

## Step 3 — Build the vector index and run the comparison (20–30 min, mostly waiting)

```
python build_index.py
python benchmark.py
```

- The benchmark asks 22 questions to each approach and waits a few seconds between calls to stay inside the free-tier limit.
- If it stops with an error or you close the laptop, just run `python benchmark.py` again — it continues where it stopped.
- When it finishes, preview the website:
  ```
  open docs/index.html
  ```
- **Send me the summary lines printed at the end** (or the file `docs/results.js`) so I can check that the two paragraphs on the website match your real numbers before you publish.

Optional: try any question yourself:
```
python ask.py "Can I work from home on Fridays?"
```

## Step 4 — Upload the code to GitHub (15 min)

1. Create a free account at **https://github.com** (if you don't have one).
2. Install **GitHub Desktop**: https://desktop.github.com → sign in with your GitHub account.
3. In GitHub Desktop: **File → Add Local Repository…** → choose `Documents/policy-assistant`.
   It will say "this directory does not appear to be a Git repository" → click **create a repository** → **Create Repository**.
4. Check the list of changed files on the left: **`.env` must NOT be in the list** (the `.gitignore` file keeps it out). If you see `.env`, stop and tell me.
5. Click **Publish repository**. **Untick "Keep this code private"** (GitHub Pages needs a public repo on a free account) → **Publish repository**.
6. Your repository link is `https://github.com/YOUR-USERNAME/policy-assistant` — **deliverable: source-code link**.

## Step 5 — Publish the website with GitHub Pages (5 min)

1. On github.com open your repository → **Settings** → **Pages** (left menu).
2. Under **Build and deployment**: Source = **Deploy from a branch**; Branch = **main**, folder = **/docs** → **Save**.
3. Wait 1–2 minutes and refresh. The page shows your link: `https://YOUR-USERNAME.github.io/policy-assistant/` — **deliverable: website link**.

Whenever you change files later: GitHub Desktop → write a short summary → **Commit to main** → **Push origin**. The site updates within a minute or two.

## Step 6 — Create your Slack workspace and test channel (10 min)

1. Go to **https://slack.com/get-started** → **Create a new workspace** with your email.
2. Workspace name must identify you, e.g. **`Andreea [Surname] – Policy Assistant`**.
3. Create a channel that also identifies you, e.g. **`#policy-bot-test-andreea`**.
4. Invite the teacher: in the channel click the channel name → **Add people** (or **Invite people to this workspace**) → enter **raz@sdu.dk** → choose the channel → **Send**.

## Step 7 — Create the Slack bot (10 min)

1. Go to **https://api.slack.com/apps** → **Create New App** → **From a manifest**.
2. Pick your new workspace → **Next**.
3. Choose the **YAML** tab, delete what's there, and paste the whole content of `slack_manifest.yml` (open it with `open -e slack_manifest.yml`) → **Next** → **Create**.
4. Left menu **Install App** → **Install to Workspace** → **Allow**.
5. Copy the **Bot User OAuth Token** (starts with `xoxb-`).
6. Left menu **Basic Information** → scroll to **App-Level Tokens** → **Generate Token and Scopes** → name it `socket` → **Add Scope** → `connections:write` → **Generate** → copy the token (starts with `xapp-`).
7. Put both tokens into `.env`:
   ```
   open -e .env
   ```
   Fill in `SLACK_BOT_TOKEN=xoxb-...` and `SLACK_APP_TOKEN=xapp-...`, save, then run `python check_setup.py` — all lines should be `[OK]`.

## Step 8 — Run the bot and take the screenshot (5 min)

1. Start the bot (leave this Terminal window open while testing):
   ```
   python slack_bot.py
   ```
   Wait for `Policy Assistant is running`.
2. In Slack, in your test channel, type:
   ```
   /invite @Policy Assistant
   ```
3. Ask a question:
   ```
   @Policy Assistant How many vacation days do I get, and can I carry unused ones over?
   ```
   (or `/policy How many vacation days do I get?`)
4. The bot replies in a thread with the answer and **Relevant policy: Vacation Policy**. Open the thread so both your question and the answer are visible, with the workspace and channel name showing.
5. Screenshot: **Cmd+Shift+4**, drag over the Slack window — **deliverable: screenshot**.
6. Stop the bot with **Ctrl+C** when you're done.

## Step 9 — Submit

- Website link (Step 5)
- The two-paragraph comparison (copy the text from the "Comparison and preferred approach" section of your website)
- Repository link (Step 4)
- Screenshot (Step 8)

---

### If something goes wrong

| Message | Fix |
|---|---|
| `command not found: python` | Run `source .venv/bin/activate` first (from inside the project folder). |
| `GEMINI_API_KEY is missing` | The `.env` file is not saved, or you are not in the project folder. |
| `429` / `RESOURCE_EXHAUSTED` | Free-tier limit. The script waits and retries; if it keeps failing, set `REQUEST_PAUSE_S=12` in `.env`, or wait until tomorrow (daily limit). |
| `model ... not found` | Change `GEMINI_MODEL` in `.env` to `gemini-3.5-flash-lite`, then run `python benchmark.py --fresh`. |
| Bot doesn't answer in the channel | Is `python slack_bot.py` still running? Did you `/invite @Policy Assistant` into the channel? |
| `not_authed` / `invalid_auth` | A Slack token was copied incompletely — copy it again into `.env`. |
