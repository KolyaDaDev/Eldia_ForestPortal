import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Landscape {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.debug = this.experience.debug

		// Resource
		this.resource = this.resources.items.forestMerged
		this.bakedTexture = this.resources.items.bakedTexture
		this.bakedTexture.flipY = false
		this.bakedTexture.encoding = THREE.sRGBEncoding
		this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)
		this.model.children[1].material = this.bakedMaterial
		this.scene.add(this.model)

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true
			}
		})
	}
}
