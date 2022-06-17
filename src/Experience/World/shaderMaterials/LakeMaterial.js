import * as THREE from 'three'
import Experience from '../../Experience.js'
import lakeVertex from '../../shaders/lake/vertex.glsl'
import lakeFragment from '../../shaders/lake/fragment.glsl'

export default class LakeMaterial {
	constructor() {
		this.experience = new Experience()
		this.time = this.experience.time
		this.debugObject = {
			depthColor: '#186691',
			surfaceColor: '#9bd8ff',
		}
		this.material = new THREE.ShaderMaterial({
			vertexShader: lakeVertex,
			fragmentShader: lakeFragment,
			uniforms: {
				uTime: { value: 0 },

				uBigWavesElevation: { value: 7.564 },
				uBigWavesFrequency: { value: new THREE.Vector2(34.114, 1) },
				uBigWavesSpeed: { value: 0.665 },

				uSmallWavesElevation: { value: 0.15 },
				uSmallWavesFrequency: { value: 4.005 },
				uSmallWavesSpeed: { value: 2.446 },
				uSmallIterations: { value: 4 },

				uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
				uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
				uColorOffset: { value: 0.194 },
				uColorMultiplier: { value: 0.184 },
			},
		})

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Lake')
		}
		this.setDebug()
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.material.uniforms.uBigWavesElevation, 'value')
				.min(-100)
				.max(100)
				.step(0.001)
				.name('uBigWavesElevation')
			this.debugFolder
				.add(this.material.uniforms.uBigWavesFrequency.value, 'x')
				.min(-100)
				.max(100)
				.step(0.001)
				.name('uBigWavesFrequencyX')
			this.debugFolder
				.add(this.material.uniforms.uBigWavesFrequency.value, 'y')
				.min(-100)
				.max(100)
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
				.min(-100)
				.max(100)
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
				.min(-100)
				.max(100)
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
