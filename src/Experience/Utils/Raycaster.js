import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor() {
		super()

		this.experience = new Experience()
		this.resources = this.experience.resources
		this.resource = this.resources.items.Greyfield
		this.sizes = this.experience.sizes
		this.camera = this.experience.camera
		this.mouse = new THREE.Vector2()
		// create Raycaster
		this.createRaycaster()
	}

	createRaycaster() {
		this.raycaster = new THREE.Raycaster()
		console.log(this.camera.instance)
		this.rayOrigin = new THREE.Vector3(-144.29486354159414, 1, 150.54402012435241)
		this.rayDirection = new THREE.Vector3(10, 0, 0)
		this.rayDirection.normalize()
		this.raycaster.set(this.rayOrigin, this.rayDirection)

		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			this.trigger('mousemoved')
		})
		this.intersectObjects = this.raycaster.intersectObjects(
			this.resource.scene.children
		)
	}

	update() {
		// this.rayOrigin = this.camera.instance
		// this.raycaster.setFromCamera(this.mouse, this.rayOrigin)
		// this.intersectObjects = this.raycaster.intersectObjects(
		// 	this.resource.scene.children
		// )
		// if (this.intersectObjects.length) {
		// }
	}
}
