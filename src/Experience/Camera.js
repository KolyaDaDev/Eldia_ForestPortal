import * as THREE from 'three'
import Experience from './Experience.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		//// added for passing to ray
		this.resource = this.experience.resources

		this.setInstance()
		this.setControls()
		// this.setRaycaster()

		// this.raycaster.update()

		// teleporter stopper
		this.teleportInProgress = false
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			1500
		)
		// sets player start
		this.instance.position.set(0, 1, 0)
		this.scene.add(this.instance)
	}

	setControls() {
		// properties for controls
		this.objects = []

		this.raycaster = new THREE.Raycaster(
			new THREE.Vector3(),
			new THREE.Vector3(0, -10, 0),
			0,
			10
		)
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

		this.onKeyDown = (e) => {
			switch (e.code) {
				case 'ArrowUp':
				case 'KeyW':
					this.moveForward = true
					console.log(this.controls.getObject().position)
					break

				case 'ArrowLeft':
				case 'KeyA':
					this.moveLeft = true
					break

				case 'ArrowDown':
				case 'KeyS':
					this.moveBackward = true
					break

				case 'ArrowRight':
				case 'KeyD':
					this.moveRight = true
					break

				case 'Space':
					if (this.canJump === true) this.velocity.y += 10
					this.canJump = false
					break
			}
		}

		this.onKeyUp = (e) => {
			switch (e.code) {
				case 'ArrowUp':
				case 'KeyW':
					this.moveForward = false
					break

				case 'ArrowLeft':
				case 'KeyA':
					this.moveLeft = false
					break

				case 'ArrowDown':
				case 'KeyS':
					this.moveBackward = false
					break

				case 'ArrowRight':
				case 'KeyD':
					this.moveRight = false
					break
			}
		}

		document.addEventListener('keyup', this.onKeyUp)
		document.addEventListener('keydown', this.onKeyDown)
	}

	teleportToEldia() {
		console.log('teleported!')
		window.open('https://floating-cove-66937.herokuapp.com/about', '_self')
		this.teleportInProgress = true
	}
	teleportToSkills() {
		console.log('teleported!')
		window.open('https://www.linkedin.com/in/nick-gillham-3bb6971a1/', '_self')
		this.teleportInProgress = true
	}
	teleportToTaxle() {
		console.log('teleported!')
		window.open('https://floating-cove-66937.herokuapp.com/about', '_self')
		this.teleportInProgress = true
	}
	teleportToFullFat() {
		console.log('teleported!')
		window.open('https://fullfatgrappling.netlify.app', '_self')
		this.teleportInProgress = true
	}
	teleportToSpace() {
		console.log('teleported!')
		window.open('https://space-portfolio-project.netlify.app', '_self')
		this.teleportInProgress = true
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.time = performance.now()
		if (this.controls.isLocked === true) {
			this.raycaster.ray.origin.copy(this.controls.getObject().position)
			// this.raycaster.ray.origin.y -= 10

			this.intersections = this.raycaster.intersectObjects(this.objects, false)

			this.onObject = this.intersections.length > 0

			// is the difference between timestamps, just as with delta time used originally. Averaging around 0.016.
			this.delta = (this.time - this.prevTime) / 1000

			this.velocity.x -= this.velocity.x * 5 * this.delta
			this.velocity.z -= this.velocity.z * 5 * this.delta

			// mass controls the speed at which you fall and rise on jump
			this.velocity.y -= 2 * 5 * this.delta // 100.0 = mass

			this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
			this.direction.x = Number(this.moveRight) - Number(this.moveLeft)
			this.direction.normalize() // this ensures consistent movements in all directions

			if (this.moveForward || this.moveBackward)
				this.velocity.z -= this.direction.z * 50.0 * this.delta
			if (this.moveLeft || this.moveRight)
				this.velocity.x -= this.direction.x * 50.0 * this.delta

			if (this.onObject === true) {
				this.velocity.y = Math.max(0, this.velocity.y)
				this.canJump = true
			}

			this.controls.moveRight(-this.velocity.x * this.delta)
			this.controls.moveForward(-this.velocity.z * this.delta)

			this.controls.getObject().position.y += this.velocity.y * this.delta // new behavior

			if (this.controls.getObject().position.y < 1) {
				this.velocity.y = 0
				this.controls.getObject().position.y = 1

				this.canJump = true
			}
		}
		this.prevTime = this.time

		if (
			this.controls.getObject().position.x > 7 &&
			this.controls.getObject().position.x < 8 &&
			this.controls.getObject().position.z > 2 &&
			this.controls.getObject().position.z < 3 &&
			!this.teleportInProgress
		) {
			this.teleportToEldia()
		}
		if (
			this.controls.getObject().position.x > 0 &&
			this.controls.getObject().position.x < 1 &&
			this.controls.getObject().position.z > 9 &&
			this.controls.getObject().position.z < 10 &&
			!this.teleportInProgress
		) {
			this.teleportToSkills()
		}
		if (
			this.controls.getObject().position.x > -14 &&
			this.controls.getObject().position.x < -13 &&
			this.controls.getObject().position.z > 9 &&
			this.controls.getObject().position.z < 10 &&
			!this.teleportInProgress
		) {
			this.teleportToTaxle()
		}
		if (
			this.controls.getObject().position.x > -6 &&
			this.controls.getObject().position.x < -5 &&
			this.controls.getObject().position.z > -8 &&
			this.controls.getObject().position.z < -7 &&
			!this.teleportInProgress
		) {
			this.teleportToSpace()
		}
		if (
			this.controls.getObject().position.x > -15 &&
			this.controls.getObject().position.x < -14 &&
			this.controls.getObject().position.z > -3 &&
			this.controls.getObject().position.z < -2 &&
			!this.teleportInProgress
		) {
			this.teleportToFullFat()
		}
	}
}
