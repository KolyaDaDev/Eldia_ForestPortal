import * as THREE from 'three'
import Experience from '../Experience'
import PortalMaterial from './shaderMaterials/PortalWaves.js'
import LakeMaterial from './shaderMaterials/LakeMaterial.js'
import SunMaterial from './shaderMaterials/SunMaterial.js'
import ProjectPlane from './ProjectPlane.js'
import Airship from './Airship.js'

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
		this.eldiaTexture = this.resources.items.eldiaTexture
		this.fullFatTexture = this.resources.items.fullFatTexture

		///// scene textures
		this.treeLeavesMedTexture = this.resources.items.blueMatCap
		this.treeLeavesMedMaterial = new THREE.MeshBasicMaterial({
			color: 'blue',
			wireframe: true,
		})

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
			this.eldiaTexture,
			'eldiaPlane',
			'eldiaPlane'
		)
		this.skillsPlane = new ProjectPlane(
			this.taxleTexture,
			'skillsPlane',
			'skillsPlane'
		)
		this.fullPlane = new ProjectPlane(
			this.fullFatTexture,
			'fullPlane',
			'fullPlane'
		)

		// models
		this.airship = new Airship()

		// Methods
		this.setModel()

		//debug
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)
		this.model.scale.set(1, 1, 1)
		this.model.position.y = 0

		// find models
		this.bakedModel = this.model.children.find(
			(child) => child.name === 'base003'
		)

		this.seaMesh = this.model.children.find((child) => child.name === 'sea')

		this.fireMesh = this.model.children.find(
			(child) => child.name === 'firepitPlane001'
		)

		// trees
		// let pattern = 'treeLeavesMed'
		// this.treeMed = this.model.children.find((child) => child.name === pattern)
		// this.treeMed.material = this.treeLeavesMedMaterial

		// materials

		this.seaMesh.material = this.lakeMaterial.material
		this.fireMesh.material = this.sunMaterial.material
		this.bakedModel.material = this.bakedMaterial

		this.scene.add(this.model)
	}

	update() {
		this.portalMaterial.update()
		this.lakeMaterial.update()
		this.sunMaterial.update()
		this.airship.update()
		// this.raycaster.update()
	}
}
