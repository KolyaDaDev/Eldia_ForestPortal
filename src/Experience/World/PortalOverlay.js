import * as THREE from 'three'
import Experience from '../Experience'
import Fragment from '../shaders/smokePortal/fragment.glsl'
import Vertex from '../shaders/smokePortal/vertex.glsl'

export default class Plane {
	constructor(debugName, planeName, posX, posY, posZ, rotation, R, G, B) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.planeName = planeName
		this.posX = posX
		this.posY = posY
		this.posZ = posZ
		this.rotation = rotation
		this.r = R
		this.g = G
		this.b = B

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
		// this.geometry = new THREE.PlaneGeometry(100, 100, 32, 32)
		this.geometry = new THREE.CircleGeometry(0.5, 20)

		this.material = new THREE.ShaderMaterial({
			vertexShader: Vertex,
			fragmentShader: Fragment,
			uniforms: {
				uTime: { value: 0 },
				uAlpha: { value: 0.84 },
				uRedVal: { value: this.r },
				uGreenVal: { value: this.g },
				uBlueVal: { value: this.b },
				uSpeedColorChange: { value: 0.0016 },
			},

			transparent: true,
		})

		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.plane.name = this.planeName

		this.plane.position.set(this.posX, this.posY, this.posZ)
		// this.plane.position.set(-158, 39, -238)
		this.plane.rotation.y = this.rotation
		this.plane.scale.set(20, 20, 20)

		console.log(this.plane.name)

		this.scene.add(this.plane)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.plane.position, 'y')
				.min(-500)
				.max(500)
				.step(0.1)
				.name('height')
			this.debugFolder
				.add(this.plane.rotation, 'y')
				.min(-500)
				.max(500)
				.step(0.1)
				.name('rotation')
			this.debugFolder
				.add(this.plane.position, 'x')
				.min(-500)
				.max(500)
				.step(0.1)
				.name('pos x ')
			this.debugFolder
				.add(this.plane.position, 'z')
				.min(-500)
				.max(500)
				.step(0.1)
				.name('pos z')

			this.debugFolder
				.add(this.material.uniforms.uRedVal, 'value')
				.min(0)
				.max(1)
				.step(0.1)
				.name('uRedVal ')
			this.debugFolder
				.add(this.material.uniforms.uGreenVal, 'value')
				.min(0)
				.max(1)
				.step(0.1)
				.name('uGreenVal ')
			this.debugFolder
				.add(this.material.uniforms.uBlueVal, 'value')
				.min(0)
				.max(1)
				.step(0.1)
				.name('uBlueVal ')
			this.debugFolder
				.add(this.material.uniforms.uAlpha, 'value')
				.min(0)
				.max(1.0)
				.step(0.01)
				.name('uAlpha')
			this.debugFolder
				.add(this.material.uniforms.uSpeedColorChange, 'value')
				.min(0)
				.max(0.01)
				.step(0.0001)
				.name('color speed change')
		}
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed
		// this.plane.rotation.z = -this.time.elapsed * 0.0001
	}
}
