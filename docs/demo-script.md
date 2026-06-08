# ChronoShift Demo Script

## Demo Overview

ChronoShift is a 2D puzzle-platformer built around a single core mechanic: timeline manipulation.

Players explore a fractured world that exists simultaneously in two temporal states: the Past and the Future. By switching between timelines, players must observe environmental changes, solve traversal puzzles, collect key items, and escape the broken timeline.

The project demonstrates how a single gameplay mechanic can generate depth, challenge, and progression through level design and environmental storytelling.

---

# Running the Game

The game can be launched using any of the following methods.

## Option 1: Play the Hosted Version

Open the deployed version in a modern browser:

:contentReference[oaicite:0]{index=0}

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

No installation is required.

---

## Option 2: Run Directly from index.html

Clone the repository:

```bash
git clone https://github.com/Eron-Coder/ChronoShift.git
cd ChronoShift
```

Open:

```text
index.html
```

in a modern browser.

This method is suitable for quick testing and review.

---

## Option 3: Run Locally Using Node.js

Clone the repository:

```bash
git clone https://github.com/Eron-Coder/ChronoShift.git
cd ChronoShift
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

or the address shown in the terminal.

This is the recommended approach for development and debugging.

---

# Controls Demonstration

Begin by introducing the controls.

| Action | Key |
|----------|----------|
| Move Left | A |
| Move Right | D |
| Jump | W |
| Shift Timeline | E |
| Restart Level | R |

Explain that timeline shifting is not a secondary ability—it is the primary gameplay mechanic around which the entire game is designed.

---

# Gameplay Demonstration

## Step 1: Basic Movement

Show:

- Horizontal movement
- Jumping
- Environmental traversal

Explain that the controls are intentionally minimal to keep focus on puzzle solving.

---

## Step 2: Timeline Switching

Press:

```text
E
```

Demonstrate switching between:

### Past

- Intact structures
- Preserved objects
- Traditional traversal routes

### Future

- Environmental decay
- Missing structures
- Alternate traversal opportunities

Explain how the same room can behave differently depending on the active timeline.

---

## Step 3: Puzzle Interaction

Show an example where:

- A path is blocked in one timeline.
- The same path becomes accessible in another.

Explain how puzzle solving emerges from understanding environmental changes across time.

Key discussion points:

- Observation
- Experimentation
- Spatial reasoning
- Temporal reasoning

---

## Step 4: Collectibles and Progression

Demonstrate:

- Item collection
- Keys
- Unlock conditions
- Timeline-dependent interactions

Explain how progression requires using both timelines rather than relying on platforming alone.

---

## Step 5: Hazards and Failure States

Demonstrate:

- Hazard collision
- Death or failure state
- Level restart using R

Explain how rapid restart supports experimentation and puzzle iteration.

---

## Step 6: Level Completion

Complete a level and demonstrate:

- Exit portal interaction
- Progression to the next level
- Increasing puzzle complexity

Explain how each level introduces new combinations of timeline interactions.

---

# Technical Highlights

## Modular Architecture

Discuss the separation of responsibilities:

### config.js

- Global configuration
- Runtime state initialization

### levels.js

- Level definitions
- Puzzle data
- Timeline-specific objects

### engine.js

- Physics
- Collision detection
- Timeline switching
- Progression logic

### render.js

- Canvas rendering
- Visual effects
- Timeline visualization

### main.js

- Main game loop
- Update orchestration
- Rendering orchestration

---

## Data-Driven Design

Levels are represented as structured object definitions rather than hard-coded gameplay logic.

Benefits:

- Easier content creation
- Faster iteration
- Improved maintainability
- Better scalability

---

## Timeline System

Explain that every object can define:

- Timeline visibility
- Timeline behavior
- Timeline transformations

This allows a single room to effectively become two interconnected puzzle spaces.

---

# Design Philosophy

ChronoShift follows a mechanic-first design approach.

The game intentionally focuses on a single gameplay mechanic:

> Timeline Manipulation

Rather than introducing numerous unrelated systems, complexity is generated through the interaction between two versions of the same environment.

The central player question is:

> "What changes if this space exists in another version of time?"

---

# Future Roadmap

Potential future improvements include:

- Additional levels
- More puzzle mechanics
- Multiple timelines
- Save system
- Dynamic level loading
- Narrative progression
- Achievement system
- Community-created content

---

# Closing Statement

ChronoShift demonstrates how a focused gameplay mechanic can drive both technical architecture and puzzle design.

The project emphasizes:

- Clean architecture
- Data-driven design
- Gameplay clarity
- Temporal puzzle solving

The result is a compact but complete puzzle-platformer built around navigating not only space, but time itself.
