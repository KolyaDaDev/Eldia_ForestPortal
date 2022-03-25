import * as THREE from 'three'
import Experience from '../../Experience.js'
import SunVertex from '../../shaders/lake/vertex.glsl'
import SunFragment from '../../shaders/lake/fragment.glsl'

export default class SunMaterial {
	constructor() {
		this.experience = new Experience()
		this.time = this.experience.time
		this.debugObject = {
			depthColor: '#b01802',
			surfaceColor: '#e3fc34',
		}
		this.material = new THREE.ShaderMaterial({
			vertexShader: SunVertex,
			fragmentShader: SunFragment,
			uniforms: {
				uTime: { value: 0 },

				uBigWavesElevation: { value: 0.016 },
				uBigWavesFrequency: { value: new THREE.Vector2(10, 10) },
				uBigWavesSpeed: { value: 1.306 },

				uSmallWavesElevation: { value: 0.174 },
				uSmallWavesFrequency: { value: 25.761 },
				uSmallWavesSpeed: { value: 0.468 },
				uSmallIterations: { value: 2 },

				uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
				uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
				uColorOffset: { value: 0.209 },
				uColorMultiplier: { value: 2.531 },
			},
		})

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Sun')
		}
		this.setDebug()
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.material.uniforms.uBigWavesElevation, 'value')
				.min(0)
				.max(1)
				.step(0.001)
				.name('uBigWavesElevation')
			this.debugFolder
				.add(this.material.uniforms.uBigWavesFrequency.value, 'x')
				.min(0)
				.max(10)
				.step(0.001)
				.name('uBigWavesFrequencyX')
			this.debugFolder
				.add(this.material.uniforms.uBigWavesFrequency.value, 'y')
				.min(0)
				.max(10)
				.step(0.001)
				.name('uBigWavesFrequencyY')
			this.debugFolder
				.add(this.material.uniforms.uBigWavesSpeed, 'value')
				.min(0)
				.max(4)
				.step(0.001)
				.name('uBigWavesSpeed')

			this.debugFolder
				.add(this.material.uniforms.uSmallWavesElevation, 'value')
				.min(0)
				.max(1)
				.step(0.001)
				.name('uSmallWavesElevation')
			this.debugFolder
				.add(this.material.uniforms.uSmallWavesFrequency, 'value')
				.min(0)
				.max(30)
				.step(0.001)
				.name('uSmallWavesFrequency')
			this.debugFolder
				.add(this.material.uniforms.uSmallWavesSpeed, 'value')
				.min(0)
				.max(4)
				.step(0.001)
				.name('uSmallWavesSpeed')
			this.debugFolder
				.add(this.material.uniforms.uSmallIterations, 'value')
				.min(0)
				.max(5)
				.step(1)
				.name('uSmallIterations')

			this.debugFolder
				.add(this.material.uniforms.uColorOffset, 'value')
				.min(0)
				.max(1)
				.step(0.001)
				.name('uColorOffset')
			this.debugFolder
				.add(this.material.uniforms.uColorMultiplier, 'value')
				.min(0)
				.max(10)
				.step(0.001)
				.name('uColorMultiplier')
			this.debugFolder.addColor(this.debugObject, 'depthColor').onChange(() => {
				this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor)
			})
			this.debugFolder.addColor(this.debugObject, 'surfaceColor').onChange(() => {
				this.material.uniforms.uSurfaceColor.value.set(
					this.debugObject.surfaceColor
				)
			})
		}
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed * 0.001
		// console.log(this.material.uniforms.uTime.value)
	}
}
