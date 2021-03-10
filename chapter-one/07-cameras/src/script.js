import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Cursor motion
// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// STATE
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (e) => {
  // this offset is so that we can have negative and positive coordinates
  const OFFSET = 0.5
  // Obviously, these mouse values are in pixels
  cursor.x = e.clientX / sizes.width - OFFSET
  cursor.y = e.clientY / sizes.height - OFFSET
  console.log(cursor)
})
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
scene.add(mesh)

// Camera
// first param, FOV. This is the vertical one, not horizontal one!
// It's in degrees
// the other param is the aspect ratio. Not new
// Other params:
// NEAR AND FAR: Correspond to how close and how far the camera can see.
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  // It's bad to use extreme values—this will create a bug called
  // "z-fighting"
  1000,
)
// const ASPECT_RATIO = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * ASPECT_RATIO,
//   1 * ASPECT_RATIO,
//   1,
//   -1,
//   0.1,
//   100,
// )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// Let's add damping to the camera (nice!)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const SCALE = 10

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  //   mesh.rotation.y = elapsedTime
  // update camera
  //   camera.position.x = cursor.x * -1 * SCALE
  //   camera.position.y = cursor.y * SCALE
  //   camera.position.x = Math.sin(Math.PI * cursor.x * -1 * 2) * 2
  //   camera.position.z = Math.cos(Math.PI * cursor.x * -1 * 2) * 2
  //   camera.position.y = cursor.y * 5
  //   camera.lookAt(new THREE.Vector3())
  controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
