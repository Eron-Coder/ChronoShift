# Game Design Document

## Vision

ChronoShift is designed around the philosophy of "one mechanic, many possibilities."

Rather than introducing numerous systems, the game explores the depth and creativity that emerge from a single mechanic: switching between timelines.

---
# Player Controls

| Action | Key |
|----------|----------|
| Move Left | A |
| Move Right | D |
| Jump | W |
| Shift Timeline | E |
| Restart Level | R |

The control scheme is intentionally minimal to keep player focus on puzzle solving and timeline manipulation rather than mechanical complexity.

Timeline switching is treated as a primary gameplay action and is positioned directly alongside movement controls for quick access during traversal and puzzle execution.

---

# Gameplay Movement System

## Horizontal Movement

The player can move left and right across platforms and environmental structures.

Movement serves two purposes:

- Traversal
- Positioning for timeline-based interactions

The movement system prioritizes responsiveness and precision to support puzzle-oriented gameplay.

---

## Jumping

The player can jump to:

- Reach elevated platforms
- Avoid hazards
- Navigate gaps
- Access timeline-dependent routes

Jumping is intentionally simple and predictable to ensure puzzle difficulty comes from decision making rather than execution complexity.

---

## Timeline Shifting

The timeline shift mechanic is the central gameplay system.

When the player presses **E**, the world transitions between:

### Past

- Structures remain intact
- Objects are preserved
- Traditional routes are available

### Future

- Structures may be destroyed
- New paths may emerge
- Environmental conditions change

Timeline shifting affects:

- Platforms
- Walls
- Doors
- Keys
- Hazards
- Collectibles
- Exit conditions

Players must constantly evaluate how an environment differs across time to progress.

---

## Level Restart

Pressing **R** immediately resets the current level.

This feature supports experimentation by allowing players to quickly recover from:

- Failed jumps
- Hazard collisions
- Puzzle mistakes
- Soft-lock situations

Fast restarts encourage exploration and reduce player frustration.

---

# Core Player Actions

Throughout gameplay the player repeatedly performs four actions:

### Observe

Identify differences between timelines.

### Experiment

Switch timelines and test assumptions.

### Navigate

Traverse the environment using movement and jumping.

### Solve

Combine information from both timelines to overcome obstacles.

These actions form the foundation of every puzzle within ChronoShift.
## Core Gameplay Loop

```text
Observe Environment
        ↓
Identify Obstacle
        ↓
Switch Timeline
        ↓
Discover New Path
        ↓
Solve Puzzle
        ↓
Reach Exit
```

---

## Player Abilities

### Movement

The player can:

* Move left
* Move right
* Jump

### Timeline Shift

The player can instantly switch between:

* Past
* Future

This ability has no loading screens or transitions and can be used during active gameplay.

---

## Puzzle Philosophy

Every puzzle should satisfy three principles:

### Readability

Players should clearly understand what changed between timelines.

### Discovery

Solutions should feel earned through observation.

### Consistency

Rules must remain predictable across all levels.

---

## Environmental Objects

### Platforms

Create movement opportunities and alternate routes.

### Walls

Restrict progression and guide navigation.

### Keys

Unlock new areas and progression paths.

### Doors

Require exploration and planning.

### Hazards

Punish careless decisions and reward awareness.

### Exit Portal

Represents successful completion of the level.

---

## Difficulty Curve

### Level 1

Introduces timeline switching.

### Level 2

Combines multiple object interactions.

### Level 3

Requires deliberate switching and puzzle planning.

### Level 4

Bonus round :)

---

## Win Condition

The player successfully completes all levels and escapes the fractured timeline.
