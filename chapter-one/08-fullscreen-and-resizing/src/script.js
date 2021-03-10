import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock = new THREE.Clock()

// Handle resizing
// Whenever we resize the canvas, we of course wanna update the variables
// holding the size itself. We also need to do some housekeeping on the
// camera so we're sure everything is working correctly.
window.addEventListener('resize', (e) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  // Remember we had to set the size of the renderer at first.
  // Now, we also have to update it.
  renderer.setSize(sizes.width, sizes.height)
  // Let's also handle the pixel ratio
  console.log(`Pixel ratio: ${window.devicePixelRatio}`)
  // We have to limit the value so that phones with crazy pixel ratios
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', (e) => {
  // First, we need to detect if we can go to fullscreen or not
  // We need a prefixed version for safari. :T
  const fullScreenElement =
    document.fullscreenElement || document.webKitFullscreenElement
  if (!fullScreenElement) {
    const requestFullscreen =
      canvas.requestFullscreen || canvas.webKitRequestFullscreen

    if (!requestFullscreen) {
      return
    }

    requestFullscreen.apply(canvas)
  } else {
    const exitFullscreen =
      document.exitFullscreen || document.webKitExitFullscreen
    exitFullscreen()
  }
})

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
