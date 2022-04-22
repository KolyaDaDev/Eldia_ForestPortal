import * as THREE from 'three'
import Experience from '../Experience'
import PortalMaterial from './shaderMaterials/PortalWaves.js'
import LakeMaterial from './shaderMaterials/LakeMaterial.js'
import SunMaterial from './shaderMaterials/SunMaterial.js'
import ProjectPlane from './ProjectPlane.js'
import PointsOfInterest from './PointsOfInterest'
import Raycaster from '../Utils/Raycaster'
export default class Greyfield {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.camera = this.experience.camera

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
		this.skillsTexture = this.resources.items.skillsTexture

		///// scene textures
		this.treeLeavesMedMaterial = new THREE.MeshBasicMaterial({
			color: 'blue',
			wireframe: true,
		})

		// instantiations

		this.spacePlane = new ProjectPlane(
			this.spaceTexture,
			'spacePortal',
			'spacePlane'
		)
		this.eldiaPlane = new ProjectPlane(
			this.eldiaTexture,
			'eldiaPlane',
			'eldiaPlane'
		)
		this.skillsPlane = new ProjectPlane(
			this.skillsTexture,
			'skillsPlane',
			'skillsPlane'
		)
		this.fullPlane = new ProjectPlane(
			this.fullFatTexture,
			'fullPlane',
			'fullPlane'
		)

		// this.poi = new PointsOfInterest()
		// instead of doing this could I not just use a raycaster and cause an html element to appear on screen?
		this.raycaster = new Raycaster(
			this.resource,
			this.camera.controls.getObject().position
		)

		// Methods
		this.setModel()

		//debug
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)
		this.model.scale.set(1, 1, 1)
		this.model.position.y = 0

		// FIND MODELS
		this.bakedModel = this.model.children.find((child) => child.name === 'baked')

		this.seaMesh = this.model.children.find((child) => child.name === 'sea')

		this.fireMesh = this.model.children.find(
			(child) => child.name === 'firepitPlane001'
		)
		this.greenCircle = this.model.children.find(
			(child) => child.name === 'greenCircle'
		)

		this.treeMed = this.model.children.find(
			(child) => child.name === 'treeLeavesMed'
		)

		for (let i = 0; i < this.model.children.length; i++) {
			switch (this.model.children[i].name) {
				case 'greenPoint':
					this.greenPoint = this.model.children[i]
					this.greenPoint.material = this.bakedMaterial
					break
				case 'redPoint':
					this.redPoint = this.model.children[i]
					this.redPoint.material = this.bakedMaterial
					break
				case 'yellowPoint':
					this.yellowPoint = this.model.children[i]
					this.yellowPoint.material = this.bakedMaterial
					break
				case 'bluePoint':
					this.bluePoint = this.model.children[i]
					this.bluePoint.material = this.bakedMaterial
					break
				case 'purplePoint':
					this.purplePoint = this.model.children[i]
					this.purplePoint.material = this.bakedMaterial
					break
				case 'stonesBoard':
					this.stonesBoard = this.model.children[i]
					this.stonesBoard.material = this.bakedMaterial
					break
				case 'purpleBoard':
					this.purpleBoard = this.model.children[i]
					this.purpleBoard.material = this.bakedMaterial
					break
				case 'greenBoard':
					this.greenBoard = this.model.children[i]
					this.greenBoard.material = this.bakedMaterial
					break
				case 'redBoard':
					this.redBoard = this.model.children[i]
					this.redBoard.material = this.bakedMaterial
					break
				case 'blueBoard':
					this.blueBoard = this.model.children[i]
					this.blueBoard.material = this.bakedMaterial
					break
				case 'yellowBoard':
					this.yellowBoard = this.model.children[i]
					this.yellowBoard.material = this.bakedMaterial
					break
				default:
					break
			}
		}

		// MATERIALS
		this.seaMesh.material = this.lakeMaterial.material
		this.fireMesh.material = this.sunMaterial.material
		this.bakedModel.material = this.bakedMaterial
		this.treeMed.material = this.treeLeavesMedMaterial
		this.greenCircle.material = this.portalMaterial.material

		this.scene.add(this.model)
	}

	update() {
		this.portalMaterial.update()
		this.lakeMaterial.update()
		this.sunMaterial.update()
		// this.poi.update()
		// this.raycaster.update()
	}
}
