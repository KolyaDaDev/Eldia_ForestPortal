import * as THREE from 'three'
import Experience from './Experience.js'

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(6, 4, 8)
		this.scene.add(this.instance)
	}

	setControls() {
		// this.controls = new OrbitControls(this.instance, this.canvas)
		// this.controls.enableDamping = true

		// properties for controls
		this.objects = []

		this.raycaster = null
		this.moveForward = false
		this.moveBackward = false
		this.moveLeft = false
		this.moveRight = false
		this.canJump = false
		this.prevTime = performance.now()

		this.velocity = new THREE.Vector3()
		this.direction = new THREE.Vector3()

		this.controls = new PointerLockControls(this.instance, document.body)

		this.blocker = document.getElementById('blocker')
		this.instructions = document.getElementById('instructions')

		this.instructions.addEventListener('click', () => {
			this.controls.lock()
		})

		this.controls.addEventListener('lock', () => {
			this.instructions.style.display = 'none'
			this.blocker.style.display = 'none'
		})

		this.controls.addEventListener('unlock', () => {
			this.blocker.style.display = 'block'
			this.instructions.style.display = ''
		})
		this.scene.add(this.controls.getObject())
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		// this.controls.update()
	}
}
