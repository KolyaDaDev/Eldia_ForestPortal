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
		this.spaceTexture = this.resources.items.spaceTexture

		// project planes
		this.spacePlane = new ProjectPlane(
			this.spaceTexture,
			'spacePortal',
			'spacePlane'
		)
		this.taxlePlane = new ProjectPlane(
			this.taxleTexture,
			'taxlePlane',
			'taxlePlane'
		)
		this.eldiaPlane = new ProjectPlane(
			this.taxleTexture,
			'eldiaPlane',
			'eldiaPlane'
		)
		this.skillsPlane = new ProjectPlane(
			this.taxleTexture,
			'skillsPlane',
			'skillsPlane'
		)
		this.fullPlane = new ProjectPlane(this.taxleTexture, 'fullPlane', 'fullPlane')

		// Methods
		this.setModel()

		//debug
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)
		this.model.scale.set(1, 1, 1)
		this.model.position.y = 0

		this.model.traverse((child) => {
			child.material = this.bakedMaterial
		})

		this.scene.add(this.model)

		// portals
		// this.portal1 = this.model.children.find(
		// 	(child) => child.name === 'skillsCircle'
		// )
		// console.log(this.portal1.position)
		// this.portal2 = this.model.children.find(
		// 	(child) => child.name === 'taxleCircle'
		// )
		// console.log(this.portal2.position)
		// this.portal3 = this.model.children.find(
		// 	(child) => child.name === 'socialCircle'
		// )
		// console.log(this.portal3.position)
		// this.portal4 = this.model.children.find(
		// 	(child) => child.name === 'portalCircle'
		// )
		// console.log(this.portal4.position)

		// /// Add material to lake
		this.lakeMesh = this.model.children.find((child) => child.name === 'sea')
		this.lakeMesh.material = this.lakeMaterial.material

		// /// Add material to firePit
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
