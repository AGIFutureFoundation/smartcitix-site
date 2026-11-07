# SmartCiti.X — Learner VR Entry (staging)

Local-only build, 2026-11-07. **Not pushed, shared, sent, or posted.** Track 4 of the
VR-spaces program: the learner-facing door into the Holodeck. The WorldForge track owns
the worlds-3d side; this track owns the learner view (skill graph + dashboard + guided
path into the Holodeck). It does not rebuild the Holodeck.

## Files

- `index.html` — the entry page (built; open it directly or serve it, see below).
  Single self-contained file: no external scripts, fonts, or images — the only
  outbound links are the two worlds-3d Holodeck URLs. Skill graph is SVG, so the page
  works even where WebGL is missing.
- `index.template.html` — source template. The sample log is injected at build time.
- `build.py` — injects `../sample-log.json` into the template → `index.html`.
  Re-run after any sample-log change: `python3 build.py`
- `verify.mjs` — validates the sample log against the Phase 1 contract and
  recomputes the dashboard figures for cross-checking. Run: `node verify.mjs`

## What the page does

1. **Mode picker** — VR headset / desktop browser / mobile. Auto-suggests from touch
   + `navigator.xr` detection; the choice only changes the instructions shown.
2. **Guided first path (3 steps)** — ① See your skills → ② Meet your coach →
   ③ Enter the Holodeck. Steps check off in-page.
3. **Skill-graph overview** — SVG constellation: learner at centre, 11 strand nodes
   on 3 tier rings (fundamentals → applied → mastery), status text-labelled on every
   node (colour is never the only signal). Per-strand bars, a mastery meter with the
   ZPD band 0.70–0.85 shaded and the 0.95 gate line, and a per-skill table for the
   selected sample learner (learner-a01…a05).
4. **Holodeck Coach** — a guide on this page (not a live agent, not a seated steward;
   Omega Hive registry is 0/44 seated). Shows what it sees and a next recommended
   skill computed in-page from the sample log, plus Q&A buttons (ZPD / gate / Holodeck).
5. **Holodeck entry** — big button to the live IWSDK player
   `https://agifuturefoundation.github.io/worlds-3d/player.html?world=smartciti-holodeck`
   (URL pattern verified in the worlds-3d IWSDK staging, `src/player.js`), lobby link
   as fallback, per-mode control hints, a WebXR “try immersive entry” button, and a
   WebGL availability probe with an honest fallback message.
6. **Sequencer panel** — weights ZPD 0.45 / review 0.25 / leverage 0.15 / modality 0.10 /
   novelty 0.05; ZPD band 0.70–0.85; gate 0.95 + 3 unaided successes; mastery
   sequencer-computed 0–1; pseudonymised learner IDs only.

## Labelling honesty (held on-page)

- “IWSDK-patterned entry — not built with IWSDK”: no `@iwsdk/core` import anywhere
  on this page. The Holodeck itself is IWSDK-live in worlds-3d; this page links in.
- “Demo mode — Sample data, not real learners” throughout; 20 events, 5 learners.
- Strands 03–11 are labelled “Strand 03”…“Strand 11”, not given invented names:
  the 11 registry strand names live in `pack/registry/skills.json`, which is not in
  this local set; only electrical + plumbing appear in the sample log.
- “Mastered” on this page uses the dashboard demo rule (passed, mastery ≥ 0.60) and
  is labelled as such; the real gate (0.95 + 3 unaided) is shown separately.
- SmartCiti.X is labelled proposed, not incorporated / funded / offered.

## Mobile / WebGL notes (built in, not yet proven on device)

- Touch: 44px+ targets, tap-to-interact, single-column layout under 560px, no
  touch-hijacking, no heavy assets (38 KB total, zero external requests on load).
- The worlds-3d IWSDK staging player was **read, not rebuilt**: `player.html`
  contains a touch joystick (`w3d-joy`) plus Jump / Interact buttons, and
  `src/player.js` documents “WASD / arrows, Space, Shift, touch joystick” and
  “Quest headset (thumbstick / teleport, ray select, grab)”. Whether that joystick
  actually drives movement on a real phone is **not verified here**.
- The cloud browser used to build this has no WebGL, so no real WebGL or mobile
  render could be proven in this environment.

## Run locally

```sh
cd ~/workspace/your_files/smartciti-dashboard-v2/vr-entry
python3 build.py        # rebuild index.html after sample-log changes
node verify.mjs         # contract + figures check (exit 0 = pass)
python3 -m http.server 8000
# open http://localhost:8000/index.html
# (Or just double-click index.html — it is self-contained and works from file://.)
# Note: loopback HTTP serving did NOT work in this build sandbox (empty replies);
# that is an environment limit, not a page fault — serve on a normal machine.
```

## Verified 2026-11-07 (local)

- `node verify.mjs` — all checks passed: 20 events, 5 learners, 13 passed attempts,
  13 mastered learner-skills (demo rule), 1 gated event, stuck =
  learner-a02|skill-sample-002; no duplicate event_ids, no mastery outside 0–1,
  no gated/outcome mismatch, no future timestamps, no personal-looking learner IDs.
  These figures match the unfiltered figures `dashboard-v2-demo.html` computes from
  the same log (same pure-function rules).
- Inline JS in `index.html` parses (`node --check` via `vm.Script`): OK.
- **Local dev-server check could NOT be completed in this sandbox (environmental,
  not a page fault):** `python3 -m http.server` binds and listens on 127.0.0.1, but
  loopback connections return empty replies (curl: HTTP 000 / “Empty reply from
  server”; raw socket: 0 bytes), and a node-server attempt hung the shell session.
  No request ever reached a handler. The page has therefore **not** been
  served-and-fetched here; open `index.html` directly from disk, or serve it on a
  machine where loopback HTTP works, before calling the serve path verified.
- Holodeck world + player pattern read in `~/workspace/your_files/worlds-3d-iwsdk`
  staging (`src/data/worlds/smartciti-holodeck.json`, `src/player.js`,
  `player.html`); trade halls include Ironworkers, Welding Trades, Boilermakers,
  Millwrights.

## Still needs a real device (Mike)

- Real phone: open this page (touch, layout, load time) and the Holodeck link
  (joystick actually moves the avatar? Jump/Interact work?).
- Real desktop WebGL browser: open the Holodeck link, confirm the 3D player renders.
- Real Quest: Enter VR in the player, confirm session, teleport, station interaction.
- No browser screenshots were possible in this environment (no live browser access
  for this track), and the local loopback HTTP check failed for environmental reasons
  (see above) — the page has been verified at file level only (syntax, contract,
  figures, content). First render still needs a real browser, phone, or headset.

## Ready for Mike to approve for push

- `index.html` (+ template/build/verify) as a staging addition under
  `smartciti-dashboard-v2/vr-entry/`. Nothing here writes to GitHub, and no push
  has been made. Suggested push target is for Mike to decide (new staging location
  vs. the SmartCiti.X repo); the page links relatively to `../dashboard-v2-demo.html`,
  `../learner-progress-contract.json`, and `../sample-log.json`, so it should travel
  with the `smartciti-dashboard-v2/` folder.

## Blocked / open

- 11 strand names: only electrical + plumbing are known locally. Real names need
  `pack/registry/skills.json` from the SmartCiti.X repo before the graph can show
  true strand names.
- Real cohort log / Real mode: Demo mode only, by design. Real mode needs a validated
  log owner and anonymisation rules (open question 3 in the Phase 1 spec).
- VR station → skill mapping (Phase 4) is still open — real station IDs are needed
  before a Holodeck station completion can move a skill on this graph.
