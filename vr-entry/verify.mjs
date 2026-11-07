// verify.mjs — SmartCiti.X Learner VR Entry: contract + figures check.
// Run: node verify.mjs  (from this directory)
// Reads ../sample-log.json + ../learner-progress-contract.json, validates every
// event against the Phase 1 contract rules, and recomputes the dashboard figures
// so they can be cross-checked against dashboard-v2-demo.html.
// Exit 0 = all checks pass. Exit 1 = any failure. No network, no writes.
import { readFileSync } from "node:fs";

const events = JSON.parse(readFileSync(new URL("../sample-log.json", import.meta.url), "utf8"));
const contract = JSON.parse(readFileSync(new URL("../learner-progress-contract.json", import.meta.url), "utf8"));

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

const REQUIRED = contract.required;
const OUTCOMES = contract.properties.outcome.enum;
const GATES = contract.properties.gate_status.enum;
const TIERS = contract.properties.tier.enum;
const SOURCES = contract.properties.source.enum;

const seen = new Set();
const now = new Date();
for (const e of events) {
  for (const f of REQUIRED) check(f in e, `${e.event_id ?? "?"}: missing required field ${f}`);
  if (seen.has(e.event_id)) failures.push(`${e.event_id}: duplicate event_id`);
  seen.add(e.event_id);
  check(typeof e.mastery === "number" && e.mastery >= 0 && e.mastery <= 1, `${e.event_id}: mastery ${e.mastery} outside 0–1`);
  check(Number.isInteger(e.attempts) && e.attempts >= 1, `${e.event_id}: attempts ${e.attempts} not an integer ≥ 1`);
  check(Number.isInteger(e.hints_used) && e.hints_used >= 0, `${e.event_id}: hints_used ${e.hints_used} not an integer ≥ 0`);
  check(OUTCOMES.includes(e.outcome), `${e.event_id}: outcome ${e.outcome} not in contract enum`);
  check(GATES.includes(e.gate_status), `${e.event_id}: gate_status ${e.gate_status} not in contract enum`);
  check(TIERS.includes(e.tier), `${e.event_id}: tier ${e.tier} not in contract enum`);
  check(SOURCES.includes(e.source), `${e.event_id}: source ${e.source} not in contract enum`);
  check(e.outcome !== "gated" || e.gate_status === "blocked" || e.gate_status === "passed",
    `${e.event_id}: outcome=gated but gate_status=${e.gate_status}`);
  const ts = new Date(e.timestamp);
  check(!Number.isNaN(ts.getTime()), `${e.event_id}: timestamp ${e.timestamp} does not parse`);
  check(ts <= now, `${e.event_id}: timestamp ${e.timestamp} is in the future`);
  check(!e.learner_id.includes("@") && !e.learner_id.includes(" "), `${e.event_id}: learner_id looks like personal data`);
}

// Independent recomputation (same rules as dashboard-v2-demo.html).
const learners = [...new Set(events.map((e) => e.learner_id))];
const passed = events.filter((e) => e.outcome === "passed").length;
const mastered = new Set(
  events.filter((e) => e.outcome === "passed" && e.mastery >= 0.6).map((e) => e.learner_id + "|" + e.skill_id),
).size;
const gated = events.filter((e) => e.gate_status === "blocked").length;
const fails = {};
for (const e of events) if (e.outcome === "failed") fails[e.learner_id + "|" + e.skill_id] = (fails[e.learner_id + "|" + e.skill_id] || 0) + 1;
const stuck = Object.entries(fails).filter(([, n]) => n >= 3).map(([k]) => k);

console.log("events:", events.length);
console.log("learners:", learners.length, learners.join(", "));
console.log("passed attempts:", passed);
console.log("mastered learner-skills (demo rule: passed, mastery ≥ 0.6):", mastered);
console.log("gated events:", gated);
console.log("stuck (3+ fails, same learner+skill):", stuck.length ? stuck.join(", ") : "none");
console.log("strands in sample:", [...new Set(events.map((e) => e.strand))].join(", "));
console.log("tiers in sample:", [...new Set(events.map((e) => e.tier))].join(", "));
console.log("sources in sample:", [...new Set(events.map((e) => e.source))].join(", "));

// Cross-checks against the figures dashboard-v2-demo.html must show unfiltered.
check(events.length === 20, `expected 20 events, got ${events.length}`);
check(learners.length === 5, `expected 5 learners, got ${learners.length}`);
check(passed === 13, `expected 13 passed attempts, got ${passed}`);
check(mastered === 13, `expected 13 mastered learner-skills, got ${mastered}`);
check(gated === 1, `expected 1 gated event, got ${gated}`);
check(stuck.length === 1 && stuck[0] === "learner-a02|skill-sample-002",
  `expected stuck = learner-a02|skill-sample-002, got ${stuck.join(", ")}`);

if (failures.length) {
  console.error("\nFAILURES:");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("\nAll checks passed.");
