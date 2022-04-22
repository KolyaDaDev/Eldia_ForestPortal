import * as THREE from 'three'
import Experience from '../Experience'

export default class PointsOfInterest {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.camera = this.experience.camera
		this.sizes = this.experience.sizes

		this.points = [
			{
				position: new THREE.Vector3(6.031037785639696, 1, 3.375627499198586),
				element: document.querySelector('.point-0'),
			},
		]
	}

	update() {
		for (const point of this.points) {
			const screenPosition = point.position.clone()
			screenPosition.project(this.camera.instance)

			const translateX = screenPosition.x * this.sizes.width * 0.5
			const translateY = -screenPosition.y * this.sizes.height * 0.5
			point.element.style.transform = `translateX(${translateX}px)`
			// point.element.style.transform = `translateY(${translateY}px)`
		}
	}
}
