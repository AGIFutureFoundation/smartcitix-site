// AGIF WORLD scene — smartcitix.agifuturefoundation.org
// TRADE CRAFT ACADEMY — union hall row, training yard, certification pylons, the skyline.
window.AGIF_SCENE = {
  id: "smartcitix",
  name: "Trade Craft Academy",
  accent: "#06b6d4",
  sky: 0x081318, fog: [0x081318, 16, 80],
  ground: { color: 0x0d1b20, grid: true },
  sun: { pos: [35, 55, 25], color: 0xcfe8f2 },

  spawn: [0, 17],

  props: [
    { type: "box", pos: [-9, 1.1, -7], size: [3, 2.2, 2], color: 0x1d2b33, flat: true, rotY: 0.12,
      label: "HALL 001", onClick: { action: "toast", text: "🏛️ HALL 001 of 111 — union halls across districts and campuses. Every hall and home marked, never a dangling link." } },
    { type: "box", pos: [-9, 1.1, -1], size: [3, 2.2, 2], color: 0x1d2b33, flat: true, rotY: -0.08,
      label: "THE HALL ROW", onClick: { action: "pulse" } },
    { type: "cone", pos: [-4.5, 1.3, 4], size: [0.8, 2.6], color: 0x155e75, flat: true,
      label: "TRAINING RIG", onClick: { action: "bounce" } },
    { type: "torus", pos: [7, 2.2, -2], size: [1.5, 1.5], color: 0x22d3ee,
      label: "ZPD DIAL — SPIN IT", onClick: { action: "spin" } },
    { type: "box", pos: [4, 0.9, 6], size: [1.8, 1.8, 1.4], color: 0x232f3a, flat: true,
      label: "QUEST ARCADE", onClick: { action: "toast", text: "🎮 206 registered quests — main, side, game, treasure, and easter egg. Every side quest gated by real lesson IDs. Quests are play, never evidence." } },
    { type: "cyl", pos: [10, 0.8, -7], size: [1, 1.6], color: 0x0e7490, flat: true,
      label: "VERIFY TERMINAL", onClick: { action: "toast", text: "✅ 9,267 checks, all passing — run from inside the bundle, no model credentials required. ./verify_all.sh and see for yourself." } },
    { type: "gate", pos: [0, 0, -13], size: [3.4, 3.4], color: 0x06b6d4,
      label: "THE WILDS GATE", onClick: { action: "toast", text: "🏔️ Four authored wilds — mountain, forest, canyon, Salt Marsh Delta. 427.9 km², 23 trade work sites, 14 off-trail caches. Authored terrain, honestly labeled. Never a survey." } },
    { type: "box", pos: [-12, 1, 5], size: [1.3, 2, 1.3], color: 0x06b6d4, flat: true,
      label: "THE REPOSITORY", onClick: { action: "link", url: "https://github.com/AGIFutureFoundation/SmartCiti.X" } },
  ],

  agents: [
    { name: "HOLODECK-$CITI", role: "simulation agent", pos: [3, 0, -4], color: 0x22d3ee, accentColor: "#06b6d4", lines: [
      "I am the $citi Holodeck. Robots rehearse in here before they meet the real world. Nobody dents anything on my floor.",
      "135 lesson steps regrouped into 27 courses, in the ladder's own layer order. Every step says whether a simulator seat stands in it.",
      "The Miami hub runs Spot, Go2, and Crazyflie for 100 hours at the real 1111 Lincoln Road garage. The garage is real. The dents are not.",
    ] },
    { name: "QUEST-CLERK", role: "arcade registrar", pos: [-5, 0, 1], color: 0xfbbf24, accentColor: "#06b6d4", lines: [
      "206 quests on the books: main, side, game, treasure, easter egg. Yes, there is an easter egg. No, I will not say where.",
      "Every side quest is gated by real lesson IDs. Do the lesson, earn the quest. Play is play — it is never evidence.",
      "Spin the ZPD dial. It meets each learner where they are. The hint ladder does the rest, with fading and a ceiling contract.",
    ] },
    { name: "SBOM-AUDITOR", role: "supply chain", pos: [8, 0, 5], color: 0xa3e635, accentColor: "#06b6d4", lines: [
      "The SBOM lists 86 components — every file hashed, versioned, and licensed from evidence. I read all of them. Twice.",
      "ACP protocol suite v3.2, 11 million pack IDs in the registry, and rollouts that walk canary to wave to full with a complete audit trail.",
      "The duck is not in the audit trail. Yet. I have opened a ticket.",
    ] },
  ],

  decor: [
    { type: "pillars", count: 20, radius: 25, color: 0x14242a, h: 3.5 },
    { type: "crystals", count: 10, radius: 14, color: 0x155e75, h: 1.3 },
  ],

  eggs: {
    duck: true, duckPos: [13, 0, -13],
    konami: "🎮 ARCADE OVERRIDE — secret cabinet unlocked. 206 quests registered and the duck holds the high score. (easter egg 2/2)",
  },

  // bespoke geometry: the city block skyline behind the yard
  build: (THREE, world, api) => {
    const towers = [[-11, 5], [-7, 8], [-3, 6.5], [1, 9], [5, 7], [9, 10], [13, 6]];
    const sky = new THREE.Group();
    towers.forEach(([x, h], i) => {
      const w = 2 + (i % 3) * 0.5;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), api.mat(i % 2 ? 0x1a2a33 : 0x22333d, true));
      b.position.set(x, h / 2, -19 + (i % 2) * 2);
      sky.add(b);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6),
        new THREE.MeshLambertMaterial({ color: 0x22d3ee, emissive: 0x0b5666 }));
      cap.position.set(x, h + 0.35, -19 + (i % 2) * 2);
      sky.add(cap);
    });
    sky.userData.onClick = { action: "toast", text: "🏙️ THE BLOCK — the Miami Construction & Infrastructure hub: Laborers/Ironworkers, 100 hours, Spot, Go2, Crazyflie. New Orleans Trades runs port, ground, water, power, and craft pathways." };
    sky.userData.label = "THE CITY BLOCK";
    api.clickables.push(sky);
    world.add(sky);
  },
};
