import * as THREE from 'three'
import Experience from '../Experience'
import objectPositions from './objectPositions'
import Fragment from '../shaders/imageShader/fragment.glsl'
import Vertex from '../shaders/imageShader/vertex.glsl'
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
		this.geometry = new THREE.CircleGeometry(1.9, 20)
		this.material = new THREE.ShaderMaterial({
			vertexShader: Vertex,
			fragmentShader: Fragment,
			uniforms: {
				uTexture: { value: this.texture },
			},
		})
		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.plane.name = this.planeName
		console.log(this.plane.name)
		this.plane.scale.set(20, 20, 20)

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
				.min(-550)
				.max(550)
				.step(0.1)
				.name('height')
			this.debugFolder
				.add(this.plane.rotation, 'y')
				.min(-550)
				.max(550)
				.step(0.1)
				.name('rotation')
			this.debugFolder
				.add(this.plane.position, 'x')
				.min(-550)
				.max(550)
				.step(0.1)
				.name('pos x ')
			this.debugFolder
				.add(this.plane.position, 'z')
				.min(-550)
				.max(550)
				.step(0.1)
				.name('pos z')
		}
	}
}
