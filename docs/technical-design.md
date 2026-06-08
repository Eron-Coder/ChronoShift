# Technical Design Document

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Rendering

* HTML5 Canvas API

### Development

* Node.js
* Lightweight static development server

---

## Architectural Goals

The project was designed to be:

* Lightweight
* Dependency-free
* Easy to understand
* Easy to extend
* Fast to iterate on

---

## Core Systems

### Game Loop

Managed by `main.js`.

Responsibilities:

* Frame timing
* Update execution
* Render execution

### Physics and Collision

Managed by `engine.js`.

Responsibilities:

* Movement
* Gravity
* Jumping
* Collision detection

### Timeline System

Managed through shared game state.

Responsibilities:

* Timeline switching
* Object activation
* State validation

### Level Management

Managed by `levels.js`.

Responsibilities:

* Room definitions
* Puzzle object placement
* Progression data

### Rendering Pipeline

Managed by `render.js`.

Responsibilities:

* Canvas rendering
* UI drawing
* Particle effects
* Visual feedback

---

## Data-Driven Design

Levels are stored as structured data rather than hard-coded gameplay logic.

Benefits:

* Faster level creation
* Easier balancing
* Reduced maintenance overhead
* Improved scalability

---

## Performance Considerations

ChronoShift maintains performance by:

* Using simple rectangular collisions.
* Limiting active object processing.
* Rendering only visible gameplay elements.
* Avoiding external frameworks and dependencies.
