import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Debug
		this.debug = this.experience.debug
		this.debugObject = {
			ALight: '#2424f9',
		}

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment')
		}
		this.setSunLight()
		this.setAmbientLight()
		this.setEnvironmentMap()
		this.setDebug()
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 4)

		this.sunLight.position.set(-5, -5, -5)
		this.sunLight.intensity = 1.259
		this.scene.add(this.sunLight)
	}

	setAmbientLight() {
		this.ambientLight = new THREE.AmbientLight(0x2424f9, 0.8)
		this.scene.add(this.ambientLight)
	}

	setEnvironmentMap() {
		this.environmentMap = {}
		this.environmentMap.intensity = 0.4
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture
		this.scene.background = this.environmentMap.texture

		this.environmentMap.updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity = this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}
		this.environmentMap.updateMaterials()
	}

	setDebug() {
		// Debug

		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, 'intensity')
				.name('sunLightIntensity')
				.min(0)
				.max(10)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'x')
				.name('sunLightX')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'y')
				.name('sunLightY')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'z')
				.name('sunLightZ')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.environmentMap, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(4)
				.step(0.001)
				.onChange(this.environmentMap.updateMaterials)

			this.debugFolder.addColor(this.debugObject, 'ALight').onChange(() => {
				this.ambientLight.color.set(this.debugObject.ALight)
			})
		}
	}
}
