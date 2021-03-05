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
