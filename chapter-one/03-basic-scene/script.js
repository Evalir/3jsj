const scene = new THREE.Scene()

// We need a "geometry" so that we can then make a cube out of it.
// https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
// Basically a base class that will hold all the primitive points to form the
// actual "triangles" needed.
const geometry = new THREE.BoxGeometry(1, 1, 1) // API is kinda shitty, but this corresponds to size (w, h, d)

// We also need to create a material.
// This pretty much feels like having different components and
// having to craft theme together.
// Can use normal colors, rgb and hex (hex is best due to it being fast af)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// A mesh is composed of a geometry and a material.
// In reality, a mesh is the collection of edges, vertices and faces that together,
// form a polyhedral shape (things like cubes or more complex stuff like dolphins).
// Makes sense, right?
// The mesh class in 3js also allows for materials to be applied.
const mesh = new THREE.Mesh(geometry, material)

// add the mesh to the scene
scene.add(mesh)

const sizes = {
  width: 800,
  height: 600,
}
// We need a camera to see stuff (POV).
// We can have different types of cameras, that's weird
// We're going to use the default type of camera
// This camerea uses perspective projection (how the eye sees things)
// https://en.wikipedia.org/wiki/Perspective_(graphical)
const camera = new THREE.PerspectiveCamera(
  // (needs further reading as well)
  // VERTICAL FOV. Turns out it's easier to manage fovs when they're vertical.
  // This is in degrees
  75,
  // ASPECT RATIO
  // width of render divided by height of render
  sizes.width / sizes.height,
)
scene.add(camera)

// Let's get the canvas.
// Been so long since I used this direct API
const canvas = document.getElementById('webgl')
// some types of renderers are available, but the webgl one is best and the one we're going to use
const renderer = new THREE.WebGLRenderer({ canvas })

// let's set the size of the renderer
// very interesting for responsive stuf... Might have to see how this is handled in stuff
// like r3f
// note that this also resizes the canvas
renderer.setSize(sizes.width, sizes.height)

// Right now everything is at the center! At this point you can't see the cube
// Note that you can only see one side of individual triangle
// That means that if we get inside (like now) you can't see the inside one,
// you can only see the outside one

// let's move the camera
// it's moved with x,y,z
// in 3js, y is up, x is right, z is towards us
// let's move the camera back with z

// also, remember how a 2d canvas is rendered on a screen, down and right is positive
// this means than in 3d, "back" is positive
camera.position.z = 3

// Like taking a photo
// What are you shooting?
// With what?
renderer.render(scene, camera)
