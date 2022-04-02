import * as THREE from 'three'
import Experience from '../Experience'
import PortalMaterial from './shaderMaterials/PortalWaves.js'
import LakeMaterial from './shaderMaterials/LakeMaterial.js'
import SunMaterial from './shaderMaterials/SunMaterial.js'
import ProjectPlane from './ProjectPlane.js'

export default class Greyfield {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		// Resource for landscape
		this.resource = this.resources.items.forestOfNiko
		this.bakedTexture = this.resources.items.bakedTexture
		this.bakedTexture.flipY = false
		this.bakedTexture.encoding = THREE.sRGBEncoding
		this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })

		/// shaderMaterials
		this.portalMaterial = new PortalMaterial()
		this.lakeMaterial = new LakeMaterial()
		this.sunMaterial = new SunMaterial()

		// project textures

		this.taxleTexture = this.resources.items.taxleTexture

		// project planes
		this.taxlePlane = new ProjectPlane(this.taxleTexture, 'taxle', 'taxlePlane')
		this.spacePlane = new ProjectPlane(this.taxleTexture, 'space', 'spacePlane')

		// Methods
		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.scale.set(1, 1, 1)
		this.model.position.y = 0

		this.model.traverse((child) => {
			child.material = this.bakedMaterial
		})

		this.scene.add(this.model)

		// /// add portal material to portals of scene
		this.portalMeshEntrance = this.model.children.find(
			(child) => child.name === 'portalCircle'
		)
		console.log(this.portalMeshEntrance)

		this.portalMeshEntrance.material = this.portalMaterial.material

		// this.portalMeshExit = this.model.children.find(
		// 	(child) => child.name === 'Circle001'
		// )
		// this.portalMeshExit.material = this.portalMaterial.material

		// /// Add material to lake
		this.lakeMesh = this.model.children.find((child) => child.name === 'sea')
		this.lakeMesh.material = this.lakeMaterial.material

		// /// Add material to taxle plane

		// /// Add material to sun
		this.sunMesh = this.model.children.find(
			(child) => child.name === 'firepitPlane001'
		)
		this.sunMesh.material = this.sunMaterial.material
	}

	update() {
		this.portalMaterial.update()
		this.lakeMaterial.update()
		this.sunMaterial.update()
		// this.raycaster.update()
	}
}
