# ChronoShift Architecture

## Overview

ChronoShift is a lightweight, dependency-free 2D puzzle-platformer built entirely with HTML5 Canvas, CSS, and vanilla JavaScript.

The project follows a modular architecture where gameplay logic, rendering, level data, and configuration are separated into dedicated files. This structure keeps the codebase easy to understand, extend, and maintain while supporting the game's core mechanic: switching between the Past and Future timelines.

---

# High-Level Architecture

```text
Keyboard Input
       │
       ▼
    main.js
(Game Loop Controller)
       │
       ▼
   engine.js
(Game Logic Layer)
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
State Levels Timeline
Data   Data   State
       │
       ▼
  render.js
(Rendering Layer)
       │
       ▼
 HTML5 Canvas
```

---

# Project Structure

```text
ChronoShift
├── assets/
├── docs/
├── scripts/
├── src/
│   ├── js/
│   │   ├── config.js
│   │   ├── engine.js
│   │   ├── levels.js
│   │   ├── main.js
│   │   └── render.js
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

---

# Module Responsibilities

| Module    | Responsibility                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| config.js | Shared constants, player state, particles, camera, screen effects, and timeline configuration               |
| levels.js | Defines all levels, rooms, puzzle objects, and timeline-specific layouts                                    |
| engine.js | Handles movement, collision detection, timeline switching, item collection, hazards, death, and progression |
| render.js | Draws levels, player, particles, UI, visual effects, timeline ghosts, and animations                        |
| main.js   | Runs the main game loop and coordinates update/render execution                                             |

---

# Runtime Flow

### Initialization

When the game starts:

1. `config.js` initializes global state.
2. `levels.js` loads level definitions.
3. `main.js` starts the game loop.
4. The first frame is rendered.

### Frame Execution

Each animation frame follows:

```text
Player Input
      │
      ▼
Game Update
(engine.js)
      │
      ▼
Collision & Logic
      │
      ▼
State Changes
      │
      ▼
Rendering
(render.js)
      │
      ▼
Canvas Output
```

---

# Timeline System

The timeline mechanic is the central gameplay feature of ChronoShift.

The game maintains a global timeline state:

```text
PAST
or
FUTURE
```

Only objects belonging to the active timeline participate in:

* Collision detection
* Hazard checks
* Interactions
* Puzzle logic

---

## Timeline Switching Flow

When the player presses the timeline switch key:

```text
Player Presses E / Shift
            │
            ▼
        switchTL()
            │
            ▼
Timeline State Changes
            │
            ▼
Active Objects Updated
            │
            ▼
Collision Recalculated
            │
            ▼
Visual Effects Triggered
            │
            ▼
Scene Re-rendered
```

The switch process also:

* Updates HUD indicators
* Triggers screen flash effects
* Produces particles
* Applies camera shake
* Checks for timeline overlap issues

---

# Level Object Schema

Most gameplay objects use the following structure:

```javascript
{
  t: 'plat',
  tl: 'past',
  x: 200,
  y: 392,
  w: 260,
  h: 22,
  pair: 'br1',
  vis: 'bridge_whole',
  id: 'optional-item-id'
}
```

---

## Common Fields

| Field        | Description                                   |
| ------------ | --------------------------------------------- |
| t            | Object type                                   |
| tl           | Active timeline (`past`, `future`, or `both`) |
| x            | Horizontal position                           |
| y            | Vertical position                             |
| w            | Width                                         |
| h            | Height                                        |
| pair         | Shared identifier linking timeline variants   |
| vis          | Renderer hint for visual appearance           |
| id           | Unique identifier used for collectibles       |
| keyId        | Required key identifier for doors/exits       |
| needsCrystal | Indicates crystal requirement for progression |

---

# Object Types

| Type    | Purpose                         |
| ------- | ------------------------------- |
| plat    | Traversable platform            |
| wall    | Solid obstacle                  |
| spike   | Hazard that kills the player    |
| key     | Collectible item                |
| door    | Locked progression gate         |
| crystal | Special progression collectible |
| medal   | Optional collectible            |
| exit    | Level completion portal         |
| deco    | Decorative environment object   |

---

# Timeline Visualization

To improve puzzle readability, ChronoShift renders inactive timeline objects as translucent "ghost" versions.

This allows players to:

* Preview alternate paths.
* Understand environmental changes.
* Plan solutions before switching timelines.

Ghost rendering is handled by `render.js` and primarily applies to paired timeline objects.

---

# Collision System

The collision system only evaluates objects active in the current timeline.

This ensures:

* Accurate puzzle behavior.
* Consistent physics.
* Clear separation between Past and Future world states.

Objects belonging to inactive timelines are ignored by gameplay systems while remaining visible through ghost rendering when applicable.

---

# Design Principles

ChronoShift was developed around several key principles:

### One Strong Mechanic

The timeline switch mechanic drives every puzzle and progression challenge.

### Readability First

Visual clarity is prioritized so players can understand timeline changes immediately.

### Dependency-Free Development

The project uses only browser-native technologies, minimizing complexity and setup requirements.

### Expandable Level Design

Levels are data-driven, allowing new rooms, objects, and puzzles to be added with minimal code changes.

### Fast Iteration

The architecture supports rapid experimentation and refinement during development.

---



# Summary

ChronoShift separates game state, rendering, level data, and gameplay logic into independent modules while centering the entire experience around a dynamic Past/Future timeline system. This architecture enables clean code organization, scalable puzzle design, and a responsive gameplay experience built around temporal exploration and problem solving.
