import * as THREE from 'three'
import Experience from '../Experience'

export default class ProjectPLane {
	constructor(texture, debugName) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.texture = texture

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

		this.scene.add(this.plane)
		this.plane.position.x = -0.8
		this.plane.position.y = 2
		this.plane.position.z = 6.3
		this.plane.rotation.y = 3
		console.log('plane added')
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
