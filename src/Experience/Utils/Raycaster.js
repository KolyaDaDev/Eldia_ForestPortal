import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor(sceneResource, camPos) {
		super()

		this.experience = new Experience()
		// this.resources = this.experience.resources
		// this.resource = this.resources.items.Greyfield
		this.resource = sceneResource
		this.cameraPosition = camPos
		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// create Raycaster
		this.createRaycaster()
	}

	createRaycaster() {
		this.raycaster = new THREE.Raycaster()
		// this.rayOrigin = this.camera.controls.getObject().position
		this.rayOrigin = this.cameraPosition
		this.rayDirection = new THREE.Vector3(0, -100, 0)
		this.rayDirection.normalize()
		this.raycaster.set(this.rayOrigin, this.rayDirection)

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			console.log(this.mouse)
			// lol the pointer lock is locking the mouse at one coord on screen!
			this.trigger('mousemoved')
		})
	}

	update() {
		this.rayOrigin = this.cameraPosition
		// this.raycaster.set(this.rayOrigin, this.rayDirection)
		this.raycaster.setFromCamera(this.mouse, this.rayOrigin)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.resource.scene.children
		)
		if (this.intersectObjects.length) {
			this.distanceToObject = this.intersectObjects[0].distance
			console.log(this.distanceToObject)``
		}
	}
}
