import * as THREE from 'three'
import Experience from '../../Experience.js'
import portalVertex from '../../shaders/portal/vertex.glsl'
import portalFragment from '../../shaders/portal/fragment.glsl'

export default class PortalMaterial {
	constructor() {
		this.experience = new Experience()
		this.time = this.experience.time
		this.debugObject = {
			colorStart: '#c6c6ff',
			colorEnd: '#1d9bf0',
		}
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 1 },
				uColorStart: { value: new THREE.Color(this.debugObject.colorStart) },
				uColorEnd: { value: new THREE.Color(this.debugObject.colorEnd) },
			},
			vertexShader: portalVertex,
			fragmentShader: portalFragment,
			side: THREE.DoubleSide,
		})

		// DEBUG
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('PortalGreen')
		}
		this.setDebug()
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.addColor(this.debugObject, 'colorStart').onChange(() => {
				this.material.uniforms.uColorStart.value.set(this.debugObject.colorStart)
			})

			this.debugFolder.addColor(this.debugObject, 'colorEnd').onChange(() => {
				this.material.uniforms.uColorEnd.value.set(this.debugObject.colorEnd)
			})
		}
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed * 0.001
		// console.log(this.material.uniforms.uTime.value)
	}
}
