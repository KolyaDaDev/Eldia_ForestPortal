import * as THREE from 'three'
import Experience from '../Experience.js'
import PortalMaterial from './PortalWaves.js'
export default class Landscape {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		// Resource for landscape
		this.resource = this.resources.items.forestMerged
		this.bakedTexture = this.resources.items.bakedTexture
		this.bakedTexture.flipY = false
		this.bakedTexture.encoding = THREE.sRGBEncoding
		this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })

		/// resource for portal
		this.portalMaterial = new PortalMaterial()

		// Methods

		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene

		this.model.children[1].material = this.bakedMaterial

		this.scene.add(this.model)

		/// add portal material to portal mesh of scene
		this.model.children[0].material = this.portalMaterial.material
	}

	update() {
		this.portalMaterial.update()
	}
}
