# ChronoShift Architecture

ChronoShift is intentionally small and dependency-free. The project uses classic browser scripts instead of a bundler so it can run from `index.html` or from the included static server.

## Runtime Flow

1. `config.js` initializes the canvas, shared constants, player state, particles, camera, flash, shake, and parallax data.
2. `levels.js` defines all rooms and timeline-specific objects.
3. `engine.js` handles collision, movement, jumping, item pickup, hazards, timeline switching, overlays, death, and level completion.
4. `render.js` draws the background, inactive timeline ghosts, transformed objects, player, particles, banners, and screen effects.
5. `main.js` runs the requestAnimationFrame loop and calls update/draw functions in order.

## Level Object Schema

Most level entries use this shape:

```js
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

Common fields:

- `t`: gameplay type, such as `plat`, `wall`, `door`, `key`, `crystal`, `medal`, `spike`, `exit`, or `deco`.
- `tl`: active timeline, either `past`, `future`, or `both`.
- `x`, `y`, `w`, `h`: rectangle used for drawing and collision.
- `pair`: optional shared identifier for two versions of the same timeline object.
- `vis`: optional renderer hint for special art, such as `bridge_whole`, `bridge_broken`, `idol_solid`, `idol_crumbled`, `torch_lit`, `torch_cold`, `pit_floor`, or `pit_spikes`.
- `id`: collectible or unlock identifier stored in `objState`.
- `keyId`: required item id for doors and exits.
- `needsCrystal`: marks the final portal crystal requirement.

## Timeline Switching

The current timeline is stored in `TL`. When the player presses `E` or `Shift`, `switchTL()` toggles between `PAST` and `FUTURE`, updates the HUD, emits particles, flashes the screen, shakes the camera, and checks whether the player switched into a newly solid object.

Collision only considers objects whose `tl` is active in the current timeline. The renderer also draws faint "ghost" versions of paired objects from the inactive timeline so the player can read the puzzle before switching.
