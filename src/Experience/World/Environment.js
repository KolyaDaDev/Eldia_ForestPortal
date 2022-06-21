import * as THREE from 'three'
import Experience from '../Experience.js'
import ChangeEnvMap from './interactive/ChangeEnvMap'

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
		// this.setEnvironmentMap()
		this.setEnvMap2()
		this.setDebug()

		this.changeButton = document.querySelector('.changeEnv')
		this.changeButton.addEventListener('click', () => {
			switch (this.currentEnv) {
				case 'space':
					this.setEnvironmentMap()
					break
				case 'desert':
					this.setEnvMap2()
					break
				default:
					break
			}
		})
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
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding
		this.environmentMap.intensity = 1

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

		this.currentEnv = 'desert'
	}

	setEnvMap2() {
		this.envMap2 = {}
		this.envMap2.texture = this.resources.items.envMap2Texture
		this.envMap2.texture.encoding = THREE.sRGBEncoding
		this.envMap2.intensity = 1
		this.scene.environment = this.envMap2.texture
		this.scene.background = this.envMap2.texture

		this.envMap2.updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.envMap2.texture
					child.material.envMapIntensity = this.envMap2.intensity
					child.matierla.needsUpdate = true
				}
			})
		}

		this.currentEnv = 'space'
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
				.add(this.envMap2, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(1)
				.step(0.001)
				.onChange(this.envMap2.updateMaterials)

			this.debugFolder.addColor(this.debugObject, 'ALight').onChange(() => {
				this.ambientLight.color.set(this.debugObject.ALight)
			})
		}
	}
}
