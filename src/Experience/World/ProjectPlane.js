import * as THREE from 'three'
import Experience from '../Experience'
import objectPositions from './objectPositions'
export default class ProjectPLane {
	constructor(texture, debugName, planeName) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.texture = texture
		this.planeName = planeName
		this.objectPositions = objectPositions

		// instantiate plane
		this.setPlane()

		//debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(debugName)
		}
		this.setDebug()
	}

	setPlane() {
		this.geometry = new THREE.PlaneGeometry(3, 2)
		this.material = new THREE.MeshBasicMaterial({
			map: this.texture,
			side: THREE.DoubleSide,
		})
		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.plane.name = this.planeName
		console.log(this.plane.name)

		this.scene.add(this.plane)

		for (const planes of this.objectPositions) {
			if (planes.name == this.planeName) {
				this.plane.position.x = planes.x
				this.plane.position.y = planes.y
				this.plane.position.z = planes.z
				this.plane.rotation.y = planes.rotation
			}
		}
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.plane.position, 'y')
				.min(0)
				.max(10)
				.step(0.1)
				.name('height')
			this.debugFolder
				.add(this.plane.rotation, 'y')
				.min(0)
				.max(10)
				.step(0.1)
				.name('rotation')
			this.debugFolder
				.add(this.plane.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('pos x ')
			this.debugFolder
				.add(this.plane.position, 'z')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('pos z')
		}
	}
}
