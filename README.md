# ChronoShift

ChronoShift is a browser-based 2D timeline-shifting puzzle platformer. The player explores ancient temple rooms, switching between Past and Future timelines to change platforms, hazards, keys, and exit paths.

## Storyline

📖 Story
The Temple Beyond Time

For centuries, legends spoke of an ancient temple hidden beyond the edge of the known world—a place said to contain secrets older than civilization itself.

Most who searched for it never returned.

You did.

A renowned time traveler and explorer, you ventured deep into forgotten ruins in pursuit of a mystery whispered across generations: the truth behind time itself.

Buried beneath layers of stone, magic, and history, you discovered something humanity was never meant to see.

Ancient inscriptions revealed that time was not a straight line.

The Past and the Future existed simultaneously, woven together by a powerful magical force hidden within the temple's heart.

But the moment the truth was uncovered, the temple awakened.

The ancient mechanisms protecting its secrets roared back to life.

Stone walls trembled.

Hidden chambers collapsed.

Mystical energies surged through forgotten corridors.

The temple began tearing itself apart across both timelines.

Now trapped inside a collapsing monument that exists in two different ages at once, your only chance of survival is to master the power hidden within.

⏳ Between Two Worlds

With the artifact you discovered, you can shift instantly between the Past and the Future.

The same room may appear completely different depending on when you exist.

In the Past:

Ancient bridges remain strong and intact.
Torches burn brightly, illuminating hidden paths.
Sacred mechanisms still function.
Long-lost structures stand untouched.

In the Future:

Bridges have crumbled into the abyss.
Torches have become piles of cold ash.
Walls have collapsed, revealing new routes.
The temple lies in ruins, twisted by centuries of decay.

Every decision becomes a puzzle.

Every jump becomes a gamble.

⚠️ Deadly Challenges

The temple does not surrender its secrets easily.

Throughout your escape, you must survive:

Razor-sharp spike traps hidden beneath ancient floors.
Massive magical trebuchets launching destructive projectiles.
Crumbling platforms that exist only in one timeline.
Moving enchanted stone blocks that shift and obstruct pathways.
Collapsing chambers filled with temporal instability.
Ancient magical barriers guarding forbidden knowledge.

One wrong step can send you plunging into darkness.

One mistimed timeline shift can trap you between collapsing structures.

✨ Ancient Magic

As you venture deeper into the temple, you will uncover remnants of a lost civilization that mastered temporal magic.

Their creations still endure:

Arcane teleporters powered by forgotten runes.
Enchanted mechanisms capable of reshaping entire rooms.
Temporal gateways linking distant locations.
Reality-bending artifacts that defy the laws of physics.

The deeper you travel, the clearer the truth becomes:

The temple was never built to protect treasure.

It was built to protect a secret.

🏃 Escape Before Time Consumes You

To survive, you must:

Switch between timelines.
Navigate deadly traps.
Solve environmental puzzles.
Harness ancient magic.
Outsmart the temple itself.

The Past holds the answers.

The Future holds the consequences.

And somewhere between them lies your only path to freedom.

Welcome to ChronoShift.

Master time. Escape the impossible. Uncover the truth. ⏳✨

## Run Locally

```bash
npm start
```

Then open:

```text
http://localhost:5500
```

You can also open `index.html` directly in a browser.

## Controls

| Action | Keys |
| --- | --- |
| Move | `A` / `D` |
| Jump | `W` |
| Switch timeline | `E` |
| Restart room | `R` |

## Project Structure

```text
.
├── assets
│   ├── timeline-conflict-right.jpg
│   └── aztec-temple-reference.jpg
├── docs
│   └── ARCHITECTURE.md
├── index.html
├── package.json
├── scripts
│   └── serve.mjs
└── src
    └── legacy modular source files
```

## Connections / Dependencies

- No build step is required.
- No audio file is required; adventurous background music is generated with the Web Audio API after the player clicks `Enter the Temple`.
- The intro background image is stored locally at `assets/timeline-conflict-right.jpg`.
- The HTML currently imports Google Fonts from `fonts.googleapis.com`. If the game must run fully offline, replace that import with local font files or CSS fallback fonts.

## Deploy

This can be deployed to any static host:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

For GitHub Pages, publish the repo root and use `index.html` as the entry point.

## Repo Setup Checklist

1. Confirm the repo remote URL.
2. Commit the current files.
3. Push to GitHub.
4. Enable GitHub Pages or connect the repo to a static hosting provider.
5. Optional: replace Google Fonts with local fonts for a fully offline build.
