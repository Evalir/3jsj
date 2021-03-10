# Chapter one

## Introduction

- His online portfolio took 3 months to build!
- Docs for 3js are good now, but it's not hands on—it's why he built the course

## What is WEBGL?

- Showcases from amazing websites—would love to create one of these today!
- Talks about what's WebGL
  - Has JS API
  - Can render "triangles" at remarkable speed (normal game knowledge here)
  - Will use \<canvas> element
  - Uses GPU

## 03 - basic scene

- Downloaded basic three.js and copied the minified file. Just like in 2015! :)
- 4 elements minimum to create a scene
  - A scene (will contain objects)
    - this is mostly a container. Like a "movie" set, as you can place stuff like lights too
  - some objects
    - primitive for many things that are "objects":
      - primitive geometry
      - imported models
      - lights
      - particles
      - etec
  - a camera
  - a renderer

## 04 - webpack

- Already know most of this, will see it for posterity

## 05 - transform objects

four properties can be transformed

- position
- scale
- rotation
- quaternion (wtf?)

- all classes that inherit from the object3d posseses those properties
  - eg: perspectivecamera or mesh
  - you can see the inheritance in the docs
- Properties are compiled in matrices
  - recalling math class—makes sense!

### moving objects

- with position, you can move stuff—it has 3 coordinates: x, y,z (duh)
  important stuff from code:
  // other software might have different axes(?)
  // what is this integer? km? m? cm?
  // YOU CAN CHOOSE, but you have to _decide_ what it is
  // this is very important as you can choose a "scale"

  - more notes in the actual code

- interesting stuff: axes helper (object to visualize the 3 axes)

  - pretty crucial ass it lets us draw the axes

- you can rotate stuff with `rotation` or `quaternion`
- `rotation` is an `euler`

  - it's like putting a stick in something and being able to rotate it with that stick (like holding a toy airplane and rotate it on each of its axes)
  - something very important! Axes do rotate with the obj.
  - the axis due to this can stop working—it's called gimbal lock.
  - to change this, we can use `reorder(...)`

- more useful things: you can group stuff together with a `Group`
  - available for all `Object3D` classes as well

### some after-lesson study notes

- `Object3D` seems to be the base class for almost all objects in 3js
- Might need to brush up on linear algebra for this: https://threejs.org/docs/#api/en/math/Vector3 i remember most things but can't visualize matrix operations as well as I could before
- Might wanna add `AxesHelper` to almost all projects—it's really useful
- For the `Euler` class, the most sensible order actually seems `XZY` due to the `Y` axis actually affecting every other rotation.
- Note that object transformations are performed with local axes, rather than the _world_ axis
- good reading on gimbal locking: https://en.wikipedia.org/wiki/Gimbal_lock
- quaternions are exactly what you learned in linear algebra too: https://en.wikipedia.org/wiki/Quaternion

## 06 - animations

- when animating, no matter the framerate, the result should be the same

## 07 - cameras

- there are lots of cameras, but we're only gonna use two (perspective/orthogonal)

### ortographic camera

- Lacks perspective—objects will look the same no matter the distance
- needs the horizontal amplitude multiplied by the aspect ratio to not squish elements

### Custom controlss

I think this is even a bit more important than the camera stuff—It's one of the most difficult parts of making a game, and the built-in controls have nice stuff like easing/damping, which is quite neat.

You can create your own just by moving your camera / elements, listening for changes and updating everything, all on the `tick()` function, but that's a bit cumbersome if any of the built-in controls fit. Here are a few cool ones:

- FlyControls: literally spaceship controls, nice. I don't know if you can modify the easing, but you can def modify the movement / rotation speed

- PointerLockControls: literally FPS controls—you handle everything, but it locks the pointer and broadcasts the movement through `mousemove` callbacks.

- OrbitControls: The one used in the tutorial. Nice to, for example, get an object or a texture and be able to rotate / zoom around it. Has damping. For some reason, needs to be imported separately, prob to reduce bloat.

## 08 - fullscreen / resizing

### Handle resizing

Whenever we resize the canvas, we of course wanna update the variables holding the size itself. We also need to do some housekeeping on the camera so we're sure everything is working correctly.

### Now, let's talk pixel ratio

Basically, jagged borders and that ugliness. This means your pixel ratio is > 1. Apple came up with a 2 pixel ratio, which we can imagine like a grid, and each cell has a division, which means four things have to be rendered on that cell. 3 is then 9 of course. The renderer can handle this pixel ratio, which we can set and limit.

### Full screen

Another housekeeping thing.

## 09 - Geometries

What is a geometry?

- Composed of vertices.
- These are joined to form faces
- If we forget faces, we get "particles". More of that later.
- A face is just a triangle between 3 vertices.
- In each vertex, we can store more than the coordinates of it.

  - UV
  - Normal

- For storing buffer geometry, we use Float32Array (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)

- One interesting performance trick: as there will be vertices in some shapes, like cubes, which share the smae coordinates, they can reuse the same vertex to form different faces, which will bring performance improvements.
