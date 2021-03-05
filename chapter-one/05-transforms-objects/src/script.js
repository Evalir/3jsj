import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
group.position.y = 0.3
group.position.x = -0.5
group.scale.y = 2
group.rotation.y = 0.5
scene.add(group)

const cubeA = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
group.add(cubeA)
const cubeB = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'green' }),
)
cubeB.position.x = 2
group.add(cubeB)
const cubeC = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' }),
)
cubeC.position.x = 4
group.add(cubeC)
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// move y (up)
// remember: y is up, x is (-)left to (+)right and z is (-)further and closer(+)
// other software might have different axes(?)
// what is this integer? km? m? cm?
// YOU CAN CHOOSE, but you have to *decide* what it is
// this is very important as you can choose a "scale"
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// scene.add(mesh)

// Interesting: as this position is a vector, we can get the length of it,
// which is just the length of the of line formed between the object and THE CENTER OF THE SCENE (NOT THE CAMERA!)
// console.log('distance to center of scene:', mesh.position.length())

// if we wanted to know the length from the object to the camera, we have a method for that (after camera initialization of course)

// Exactly what it seems. Normalizes the vector so that the length is 1.
// Will be useful later!
// mesh.position.normalize()

// useful method to set position (again shitty non-obj api)
// mesh.position.set(0.7, -0.6, 1)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// create an axes helper to draw axes on the scene
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// let' move the camera so the axes are move obvious
camera.position.set(-0.3, 0)

// Let's do some scaling
// mesh.scale.x = 1
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5

// now, let's do some rotation
// nteresting but obvious at first glance = 1 rotation = pi
// note the reorder func—see the docs, but this is to avoid weird rotation
// and gimbal locking
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI / 3
// mesh.rotation.y = Math.PI / 2
// this is all with the Euler-way of doing this. Easy to imagine, but easy to work with.
// Quaternion is harder to imagine, but easier to work with, with time!

// before ethough, object3d instances have a lookAt method which rotate the object so the -z faces the etarget you provided. Interessting!
// works with vectors (hah! there we go!)
// camera.lookAt(mesh.position)
// this gives me a slight idea of how these rotating perspectives work:
// look at origin and move ea bit upwards, and then rotate the camera.
// All of this position and animation change does lend itself to atomic updates though, or view = fn(state), so, r3f now makes sense

// We can also group stuff into a `Group` and move the whole stuff together.
// here
// console.log('distance to camera:', mesh.position.distanceTo(camera.position))
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
