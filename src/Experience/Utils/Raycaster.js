import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor(sceneResource, camPos) {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
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
		// this.rayOrigin = this.camera.controls.getObject().position
		this.rayOrigin = this.cameraPosition
		this.rayDirection = new THREE.Vector3(0, 0, 1)
		this.rayDirection.normalize()

		this.raycaster = new THREE.Raycaster(this.rayOrigin, this.rayDirection, 0, 3)

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			// lol the pointer lock is locking the mouse at one coord on screen!
			this.trigger('mousemoved')
		})
	}

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.resource.scene.children
		)

		if (this.intersectObjects.length) {
			this.distanceToObject = this.intersectObjects[0].object
			if (this.distanceToObject.name === 'stonesBoard') {
				alert('ancient alien stones....')
			}
		}
	}
}
