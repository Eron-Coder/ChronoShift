// ChronoShift
// Level data and timeline-specific object definitions.

const LEVELS=[

// ════════════════════════════════════════════════════════════════
// LEVEL 1 — INNER SANCTUM (Tutorial)
// Setting  : Deep torchlit chamber — simplest room
// Teaches  : Movement, jump, timeline switch
// Pairs    : Pair 1 (bridge) + Pair 5 (spike-pit reversal)
// Beat 1   : Start PAST — cross solid bridge (Pair 1 whole form)
// Beat 2   : Ancient Key on platform ahead
// Beat 3   : Switch to FUTURE — bridge behind you breaks (Pair 1 broken) →
//            can't return. Ahead: spike pit appears (Pair 5). Must navigate
//            upper ledge path to exit (which just opened).
// Collectible: Ancient Key (obvious, teaches key pickup mechanic)
// ════════════════════════════════════════════════════════════════
{
  name:'INNER SANCTUM', sub:'Tutorial Chamber',
  hint:'The bridge holds in the past. Switch — and never look back.',
  lore:'Deep inside the temple, you wake. The air smells of old stone and burnt oil.',
  w:20, h:12,
  playerStart:{x:58,y:356},
  startTL:PAST,
  exitNeedsKey:false,
  objects:[
    // ── Bounds ──
    {t:'wall',tl:'both',x:0,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:760,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:0,y:0,w:800,h:10},
    {t:'plat',tl:'both',x:0,y:440,w:800,h:40},

    // ── Starting ledge ──
    {t:'plat',tl:'both',x:40,y:392,w:160,h:20},
    // Torch decoration at start — teaches pair 3 visually (no stakes yet)
    {t:'spike',tl:'past',  pair:'tc1',vis:'torch_lit', x:155,y:358,w:30,h:34,decor:true},
    {t:'plat', tl:'future',pair:'tc1',vis:'torch_cold',x:155,y:392,w:30,h:20},

    // ── PAIR 1 — WOODEN BRIDGE ──
    // Past: solid planks. Future: broken (gap in middle, can't cross).
    {t:'plat',tl:'past',  pair:'br1',vis:'bridge_whole', x:200,y:392,w:220,h:22},
    {t:'plat',tl:'future',pair:'br1',vis:'bridge_broken',x:200,y:392,w:220,h:22},

    // ── Middle safe ledge (both) ──
    {t:'plat',tl:'both',x:420,y:392,w:60,h:20},

    // ── Key platform reachable in PAST ──
    {t:'plat',tl:'both',x:480,y:330,w:120,h:18},
    // Ancient Key — obvious placement, teaches pickup
    {t:'key',tl:'past',x:520,y:298,w:22,h:32,id:'k1'},

    // ── PAIR 5 — SPIKE PIT REVERSAL ──
    // Past: safe stone floor (continuaton). Future: spikes appear — deadly.
    {t:'plat',  tl:'past',  pair:'sp1',vis:'pit_floor', x:480,y:392,w:200,h:20},
    {t:'spike', tl:'future',pair:'sp1',vis:'pit_spikes',x:480,y:422,w:200,h:18},

    // ── Upper bypass path (both — safe route past the pit) ──
    {t:'plat',tl:'both',x:600,y:290,w:100,h:18},
    {t:'plat',tl:'both',x:660,y:350,w:80,h:18},

    // ── Sealed door (needs k1, in FUTURE) ──
    {t:'door',tl:'future',x:680,y:358,w:38,h:82,keyId:'k1'},

    // ── Exit portal (FUTURE) ──
    {t:'exit',tl:'future',x:718,y:346,w:58,h:94,keyId:'k1'},

    // Pit below bridge — past spikes so player doesn't fall safely
    {t:'spike',tl:'past',x:210,y:422,w:200,h:18},
  ]
},

// ════════════════════════════════════════════════════════════════
// LEVEL 2 — THE TEMPLE HALLS
// Setting  : Long corridor with pillars and inner chambers
// Teaches  : Pair 2 (Stone Idol) + Pair 4 (Sealed Door)
// Beat 1   : Start PAST — Idol wall (Pair 2 solid) blocks path. Can't pass.
// Beat 2   : Switch FUTURE — Idol crumbled. Pass through rubble.
// Beat 3   : Time Crystal behind the idol (FUTURE only).
//            Sealed door ahead (Pair 4) — open in PAST, wall in FUTURE.
//            Must return to PAST with key logic to reach exit.
// AHA MOMENT: The same stone that blocks you in PAST is gone in FUTURE —
//             but the door you need is only passable in PAST.
// ════════════════════════════════════════════════════════════════
{
  name:'THE TEMPLE HALLS', sub:'Inner Corridor',
  hint:'The idol crumbles in the future. But the door only opens in the past.',
  lore:'A long corridor stretches forward. Carved faces watch from the walls.',
  w:24, h:12,
  playerStart:{x:58,y:364},
  startTL:PAST,
  exitNeedsKey:true,
  objects:[
    // Bounds
    {t:'wall',tl:'both',x:0,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:920,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:0,y:0,w:960,h:10},
    {t:'plat',tl:'both',x:0,y:440,w:960,h:40},

    // Start ledge
    {t:'plat',tl:'both',x:40,y:400,w:180,h:20},

    // Pillars (both — atmospheric obstacles)
    {t:'plat',tl:'both',x:220,y:280,w:30,h:160},
    {t:'plat',tl:'both',x:340,y:300,w:30,h:140},

    // Pit after first pillar
    {t:'spike',tl:'both',x:250,y:422,w:90,h:18},
    // Bridge over pit (both — no puzzle yet, just layout)
    {t:'plat',tl:'both',x:250,y:360,w:90,h:18},

    // ── PAIR 2 — STONE IDOL ──
    // Past: solid stone wall — impassable.
    // Future: crumbled into rubble pile — short, passable.
    {t:'wall',tl:'past',  pair:'id1',vis:'idol_solid',   x:370,y:200,w:44,h:240},
    {t:'plat',tl:'future',pair:'id1',vis:'idol_crumbled',x:356,y:414,w:72,h:26},

    // ── Area behind idol (reachable FUTURE only) ──
    {t:'plat',tl:'both',x:414,y:370,w:160,h:20},
    {t:'plat',tl:'both',x:414,y:290,w:120,h:18},

    // Time Crystal — behind idol, FUTURE only (collectible)
    {t:'crystal',tl:'future',x:450,y:258,w:28,h:36,id:'tc1'},

    // Ancient Key — also behind idol, past only (for the door)
    {t:'key',tl:'past',x:460,y:355,w:22,h:32,id:'k2'},

    // ── PAIR 4 — SEALED DOOR ──
    // Past: open archway — walk through freely.
    // Future: sealed stone door — impassable.
    {t:'plat',tl:'future',pair:'sd1',vis:'door_sealed',x:574,y:220,w:44,h:220},
    // In past it's open — just an arch marker, no solid
    {t:'deco',tl:'past',  pair:'sd1',vis:'door_open',  x:574,y:220,w:44,h:220},

    // Area beyond sealed door
    {t:'plat',tl:'both',x:618,y:380,w:180,h:20},
    {t:'plat',tl:'both',x:700,y:310,w:120,h:18},

    // ── Torch pair (L1 knowledge — used as hazard reminder here) ──
    {t:'spike',tl:'past',  pair:'tc2',vis:'torch_lit', x:540,y:364,w:30,h:36},
    {t:'plat', tl:'future',pair:'tc2',vis:'torch_cold',x:540,y:400,w:30,h:18},

    // Final door (needs k2)
    {t:'door',tl:'both',x:754,y:310,w:40,h:90,keyId:'k2'},

    // Exit
    {t:'exit',tl:'both',x:794,y:298,w:64,h:102,keyId:'k2'},

    // Spike field (past) approaching door area
    {t:'spike',tl:'past',x:618,y:422,w:100,h:18},
    {t:'spike',tl:'future',x:720,y:422,w:80,h:18},
  ]
},

// ════════════════════════════════════════════════════════════════
// LEVEL 3 — COLLAPSED CHAMBERS
// Setting  : Ruined inner hall — rubble everywhere, multi-path
// Teaches  : All pairs remixed. Zigzag timeline navigation.
// Puzzle   : A path safe in PAST has spikes in FUTURE (Pair 5 again).
//            Torch pair blocks direct route in PAST (Pair 3).
//            Bridge broken in FUTURE forces upper detour (Pair 1).
//            Must switch 3+ times in the right sequence.
// Hidden Collectible: Temple Medal — requires backtracking (FUTURE, off main path)
// ════════════════════════════════════════════════════════════════
{
  name:'COLLAPSED CHAMBERS', sub:'Ruined Hall',
  hint:'Safe in the past, deadly in the future. You must walk both.',
  lore:'Rubble chokes the hall. Time has not been kind to this place.',
  w:26, h:13,
  playerStart:{x:58,y:396},
  startTL:PAST,
  exitNeedsKey:true,
  objects:[
    // Bounds
    {t:'wall',tl:'both',x:0,y:0,w:40,h:520},
    {t:'wall',tl:'both',x:1000,y:0,w:40,h:520},
    {t:'wall',tl:'both',x:0,y:0,w:1040,h:10},
    {t:'plat',tl:'both',x:0,y:460,w:1040,h:40},

    // Start ledge
    {t:'plat',tl:'both',x:40,y:432,w:140,h:20},

    // ── PAIR 5 REVERSAL: first test zone ──
    // In PAST: safe stone floor. In FUTURE: spikes erupt.
    {t:'plat',  tl:'past',  pair:'sp2',vis:'pit_floor', x:180,y:432,w:180,h:20},
    {t:'spike', tl:'future',pair:'sp2',vis:'pit_spikes',x:180,y:442,w:180,h:18},

    // Elevated path above (both — alternate route for future)
    {t:'plat',tl:'both',x:180,y:360,w:80,h:16},
    {t:'plat',tl:'both',x:280,y:330,w:80,h:16},

    // ── PAIR 3 — TORCH ── blocks direct ground path in PAST
    {t:'spike',tl:'past',  pair:'tc3',vis:'torch_lit', x:200,y:396,w:30,h:36},
    {t:'plat', tl:'future',pair:'tc3',vis:'torch_cold',x:200,y:432,w:30,h:20},

    // ── Middle zone — both safe ──
    {t:'plat',tl:'both',x:360,y:432,w:100,h:20},
    {t:'plat',tl:'both',x:360,y:360,w:80,h:16},

    // ── PAIR 1 BRIDGE — mid section ──
    {t:'plat',tl:'past',  pair:'br2',vis:'bridge_whole', x:460,y:432,w:200,h:22},
    {t:'plat',tl:'future',pair:'br2',vis:'bridge_broken',x:460,y:432,w:200,h:22},
    // Must take upper path in future
    {t:'plat',tl:'future',x:470,y:360,w:70,h:16},
    {t:'plat',tl:'future',x:570,y:320,w:80,h:16},
    {t:'plat',tl:'future',x:640,y:355,w:60,h:16},

    // ── Ancient Key — on elevated past path ──
    {t:'key',tl:'past',x:490,y:326,w:22,h:32,id:'k3'},
    {t:'plat',tl:'past',x:474,y:358,w:80,h:16},

    // ── Temple Medal (hidden collectible) — FUTURE, off main path ──
    {t:'plat',tl:'future',x:300,y:288,w:60,h:16},
    {t:'medal',tl:'future',x:315,y:256,w:28,h:28,id:'med1'},

    // ── Far zone — remixed pair 5 again ──
    {t:'plat',  tl:'past',  pair:'sp3',vis:'pit_floor', x:660,y:432,w:140,h:20},
    {t:'spike', tl:'future',pair:'sp3',vis:'pit_spikes',x:660,y:442,w:140,h:18},
    {t:'plat',tl:'both',x:800,y:432,w:80,h:20},
    {t:'plat',tl:'both',x:800,y:360,w:80,h:16},

    // ── Second torch — PAST hazard, must go around or switch ──
    {t:'spike',tl:'past',  pair:'tc4',vis:'torch_lit', x:756,y:396,w:30,h:36},
    {t:'plat', tl:'future',pair:'tc4',vis:'torch_cold',x:756,y:432,w:30,h:20},

    // Door + exit
    {t:'door',tl:'both',x:848,y:360,w:40,h:100,keyId:'k3'},
    {t:'exit',tl:'both',x:888,y:348,w:68,h:112,keyId:'k3'},

    // Decorative rubble pillars (past visual only)
    {t:'plat',tl:'past',x:440,y:340,w:20,h:120},
    {t:'plat',tl:'past',x:640,y:320,w:18,h:140},
  ]
},

// ════════════════════════════════════════════════════════════════
// LEVEL 4 — TEMPLE GATEWAY (FINALE)
// Setting  : Exterior — crumbling steps, jungle visible behind arches
// Introduces: Exit Portal requires Time Crystal to activate
// Puzzle   : Short, punchy gauntlet. All pairs appear.
//            Time Crystal is mandatory — blocks portal.
//            Idol blocks crystal path in PAST → switch FUTURE → get crystal.
//            Key is in PAST (behind a bridge only whole in PAST).
//            Portal is FUTURE only.
//            Triumphant sequence — every prior lesson used once.
// Tone     : Fast, satisfying, triumphant.
// ════════════════════════════════════════════════════════════════
{
  name:'TEMPLE GATEWAY', sub:'The Final Threshold',
  hint:'The crystal opens the portal. The bridge opens the past. Use both.',
  lore:'Daylight bleeds through the crumbling arch. Freedom is close.',
  w:22, h:12,
  playerStart:{x:58,y:364},
  startTL:PAST,
  exitNeedsKey:false,
  exitNeedsCrystal:true,
  objects:[
    // Bounds
    {t:'wall',tl:'both',x:0,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:840,y:0,w:40,h:480},
    {t:'wall',tl:'both',x:0,y:0,w:880,h:10},
    {t:'plat',tl:'both',x:0,y:440,w:880,h:40},

    // Start ledge
    {t:'plat',tl:'both',x:40,y:400,w:140,h:20},

    // ── PAIR 1 BRIDGE — key is only reachable via whole bridge in PAST ──
    {t:'plat',tl:'past',  pair:'br3',vis:'bridge_whole', x:180,y:400,w:180,h:22},
    {t:'plat',tl:'future',pair:'br3',vis:'bridge_broken',x:180,y:400,w:180,h:22},
    {t:'spike',tl:'past',x:190,y:422,w:170,h:18},

    // Key on far ledge (PAST only — reached via whole bridge)
    {t:'plat',tl:'both',x:360,y:400,w:100,h:20},
    {t:'key',tl:'past',x:390,y:368,w:22,h:32,id:'k4'},

    // ── PAIR 2 IDOL — blocks upper path in PAST ──
    {t:'wall',tl:'past',  pair:'id2',vis:'idol_solid',   x:460,y:200,w:44,h:240},
    {t:'plat',tl:'future',pair:'id2',vis:'idol_crumbled',x:448,y:414,w:72,h:26},

    // Time Crystal — FUTURE only, behind idol (mandatory for exit)
    {t:'plat',tl:'both',x:504,y:360,w:180,h:20},
    {t:'plat',tl:'both',x:560,y:290,w:120,h:18},
    {t:'crystal',tl:'future',x:590,y:256,w:28,h:36,id:'cr1'},

    // ── PAIR 3 TORCH — past hazard on approach to exit ──
    {t:'spike',tl:'past',  pair:'tc5',vis:'torch_lit', x:504,y:364,w:30,h:36},
    {t:'plat', tl:'future',pair:'tc5',vis:'torch_cold',x:504,y:400,w:30,h:18},

    // ── PAIR 5 PIT — spike reversal on final approach ──
    {t:'plat',  tl:'past',  pair:'sp4',vis:'pit_floor', x:684,y:400,w:100,h:20},
    {t:'spike', tl:'future',pair:'sp4',vis:'pit_spikes',x:684,y:420,w:100,h:18},
    {t:'plat',tl:'future',x:690,y:350,w:90,h:16},

    // Final door (needs k4)
    {t:'door',tl:'both',x:744,y:340,w:40,h:100,keyId:'k4'},

    // ── EXIT — only active in FUTURE + needs crystal ──
    {t:'exit',tl:'future',x:784,y:328,w:56,h:112,keyId:'k4',needsCrystal:true},

    // Atmospheric torches (no pair — pure decoration past side)
    {t:'spike',tl:'past',x:150,y:380,w:24,h:20,decor:true},
  ]
}

]; // ── end LEVELS
