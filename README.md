# ChronoShift

ChronoShift is a browser-based 2D timeline-shifting puzzle platformer. The player explores ancient temple rooms, switching between Past and Future timelines to change platforms, hazards, keys, and exit paths.

This repo is packaged from the current `chronoshift_fbg.html` build and is ready to run as a static site.

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
