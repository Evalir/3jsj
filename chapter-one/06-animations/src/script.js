import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// STATE: This will keep our delta
let time = Date.now()

const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

function tick() {
  // This is very important;
  // This piece of code is keeping the time difference between the last frame and this one—
  // we don't really wanna "drop" frames or appear faster or slower due to having a higher
  // framerate, so this trick basically gets the difference, and we can multiply the
  // rotation "amount" by this, so that no matter the frames dropped, this always stays
  // in sync
  // This is manual though, and there's a built-in solution in 3js
  //   const currentTime = Date.now()
  //   const delta = currentTime - time
  //   time = currentTime
  //   console.log(delta)
  //   console.log(time)
  // This basically gives the elapsed time in seconds SINCE the first frame was painted.
  // This interesting because it basically performs the trick itself.
  const elapsedTime = clock.getElapsedTime()
  // Update objects
  //   mesh.rotation.y = elapsedTime * Math.PI * 2
  // This makes sense: We're just traveling through the sine function over the x axis, and
  // getting the y value for it.
  //   mesh.position.y = Math.cos(elapsedTime)
  //   mesh.position.x = Math.sin(elapsedTime)
  // We can do the same for the camera with more interesting results
  //   camera.position.y = Math.cos(elapsedTime)
  //   camera.position.x = Math.sin(elapsedTime)
  camera.lookAt(mesh.position)
  // Render updated scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
