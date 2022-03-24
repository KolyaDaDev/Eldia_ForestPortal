import * as THREE from 'three'
import Experience from '../Experience'
import PortalMaterial from './shaderMaterials/PortalWaves.js'
import LakeMaterial from './shaderMaterials/LakeMaterial.js'
import SunMaterial from './shaderMaterials/SunMaterial.js'

export default class Greyfield {
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

		/// shaderMaterials
		this.portalMaterial = new PortalMaterial()
		// this.lakeMaterial = new LakeMaterial()
		// this.sunMaterial = new SunMaterial()

		/// raycaster

		// Methods
		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.scale.set(1, 1, 1)
		this.model.position.y = 0
		console.log(this.model)
		this.model.children[1].material = this.bakedMaterial
		this.scene.add(this.model)

		// /// add portal material to portals of scene
		this.portalMeshEntrance = this.model.children.find(
			(child) => child.name === 'Circle'
		)
		this.portalMeshEntrance.material = this.portalMaterial.material

		// this.portalMeshExit = this.model.children.find(
		// 	(child) => child.name === 'Circle001'
		// )
		// this.portalMeshExit.material = this.portalMaterial.material

		// /// Add material to lake
		// this.lakeMesh = this.model.children.find(
		// 	(child) => child.name === 'Landscape_plane001'
		// )
		// this.lakeMesh.material = this.lakeMaterial.material

		// /// Add material to sun
		// this.sunMesh = this.model.children.find((child) => child.name === 'sun')
		// this.sunMesh.material = this.sunMaterial.material
	}

	update() {
		// this.portalMaterial.update()
		// this.lakeMaterial.update()
		// this.sunMaterial.update()
		// this.raycaster.update()
	}
}
