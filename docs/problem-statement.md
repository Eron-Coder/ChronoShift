# ChronoShift

## Track

Puzzle & Mechanics-Driven Games

---

# Problem Statement

Design and implement a 2D puzzle-platformer centered around a single core mechanic: timeline manipulation.

Players navigate a fractured world that simultaneously exists in two temporal states—Past and Future. By switching between these timelines in real time, players must observe environmental differences, exploit temporal changes, and solve traversal-based puzzles.

The challenge is not simply building a platformer, but creating meaningful gameplay that emerges from the interaction between two versions of the same space.

The project should demonstrate how a single mechanic can generate depth, variety, and player-driven problem solving.

---

# Theme

### "The World Exists Twice."

The Past and Future overlap in unstable ways.

Bridges collapse.

Walls crumble.

Artifacts disappear.

Pathways emerge.

To escape, the player must learn to navigate not only space, but time itself.

---

# Core Gameplay Pillars

## 1. Timeline Manipulation

The player can instantly switch between:

### Past

The world before collapse.

Characteristics:

* Structures remain intact.
* Objects are preserved.
* Traditional routes are available.

### Future

The world after transformation.

Characteristics:

* Environmental decay.
* Missing structures.
* Alternate traversal opportunities.

Timeline switching must be integrated into every major gameplay challenge.

---

## 2. Environmental Puzzle Solving

Progression should require:

* Observation
* Experimentation
* Spatial reasoning
* Temporal reasoning

The player should frequently ask:

> "What exists here in the other timeline?"

---

## 3. Platforming and Traversal

Players must:

* Move
* Jump
* Navigate hazards
* Utilize timeline differences to reach otherwise inaccessible areas

Platforming serves as the delivery mechanism for the timeline mechanic.

---

# Functional Requirements

The project must include:

## Player Controller

A controllable player character with:

* Horizontal movement
* Jumping
* Collision handling

---

## Timeline System

A dedicated timeline-switch mechanic that:

* Toggles between Past and Future
* Updates level state instantly
* Alters active gameplay objects
* Provides clear visual feedback

---

## Environmental Objects

At least three object categories should interact with timeline switching.

Examples include:

### Platforms

Present in one timeline and absent in another.

### Doors

Require exploration across timelines.

### Keys

Collected in one timeline and used in another.

### Hazards

Appear only in specific timelines.

### Environmental Obstacles

Change accessibility between states.

---

## Multi-Level Progression

The game should contain multiple handcrafted levels that gradually increase in complexity.

Each level should introduce new ways of thinking about timeline interaction.

---

## Completion System

The game must provide:

* Level completion conditions
* Clear progression feedback
* End-state or victory screen

---

# Minimum Viable Product

A successful MVP should demonstrate:

* Functional movement.
* Real-time timeline switching.
* Multiple puzzle rooms.
* Timeline-dependent environmental changes.
* A complete start-to-finish gameplay loop.

The MVP should prioritize mechanic quality over content quantity.

---

# Design Philosophy

ChronoShift follows the principle:

### "One Mechanic, Many Outcomes"

Rather than introducing numerous systems, the game explores the depth created by a single carefully designed interaction.

New puzzles should emerge from:

* Different level layouts.
* Different object relationships.
* Different timeline states.

Not from introducing unrelated mechanics.

---

# Technical Expectations

The implementation should:

* Separate gameplay logic from rendering.
* Support data-driven level creation.
* Maintain consistent rules across all levels.
* Be easy to extend with additional puzzles.

Recommended technologies include:

* HTML5 Canvas
* JavaScript (ES6)
* TypeScript (optional)
* Phaser
* Godot
* Unity
* Pygame

Technology choice is secondary to gameplay quality and architectural clarity.

---

# Stretch Goals

Potential extensions include:

## Gameplay

* Additional levels
* Optional collectibles
* Hidden routes
* Time-limited challenges

## Systems

* Save progress
* Checkpoint system
* Achievement tracking

## Presentation

* Particle effects
* Dynamic lighting
* Enhanced timeline transitions
* Original audio design

## Advanced Mechanics

* Additional timelines
* Timeline instability
* Persistent timeline consequences
* Temporal paradox puzzles

---

# AI Tool Usage

AI tools may be used to assist development, including:

* Prototyping
* Debugging
* Documentation
* Refactoring
* Puzzle ideation
* Visual concept generation

Developers should disclose AI usage within project documentation and clearly identify human-authored design decisions.

---

# Demo Expectations

A successful demo should showcase:

1. Core movement mechanics.
2. Timeline switching.
3. Environmental transformation.
4. At least one puzzle requiring temporal reasoning.
5. Level completion.
6. A brief explanation of the timeline system architecture.

The audience should understand the mechanic within the first minute of gameplay.

---

# Evaluation Criteria

Projects will be evaluated on:

## Gameplay Design

How effectively the timeline mechanic creates interesting decisions.

## Puzzle Quality

Clarity, creativity, and progression of challenges.

## Technical Execution

Code organization, maintainability, and system design.

## Player Experience

Visual clarity, responsiveness, and usability.

## Polish

Presentation quality, effects, feedback, and overall completeness.

## Innovation

Creative applications of timeline-based interactions beyond the minimum requirements.

---

# Success Definition

ChronoShift succeeds when players stop thinking about buttons and controls and begin thinking about timelines.

The mechanic should feel less like switching worlds and more like solving problems across time itself.
