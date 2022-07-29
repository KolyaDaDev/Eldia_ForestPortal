import * as THREE from 'three'
import Experience from '../Experience'
import PortalMaterial from './shaderMaterials/PortalWaves.js'
import ProjectPlane from './ProjectPlane.js'
// import PointsOfInterest from './PointsOfInterest'
// import Raycaster from '../Utils/Raycaster'
import TestCharacter2 from './characters/TestCharacter2'
import PortalOverlay from './PortalOverlay'

export default class Greyfield {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.camera = this.experience.camera
		// this.postProcessing = new PostProcessing()
		this.character = new TestCharacter2()

		// Resource for landscape
		this.resource = this.resources.items.modelForBake
		// this.bakedTexture = this.resources.items.bakedTexture
		// this.bakedTexture.flipY = false
		// this.bakedTexture.encoding = THREE.sRGBEncoding
		// this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
		this.resourceForMaterial = this.resources.items.modelForMaterial
		this.resourceArrows = this.resources.items.arrows
		this.resourceSigns = this.resources.items.signs

		// shaderMaterials
		this.portalMaterial = new PortalMaterial()

		// project textures
		this.spaceTexture = this.resources.items.spaceTexture
		this.eldiaTexture = this.resources.items.eldiaTexture
		this.rmjTexture = this.resources.items.rmjTexture
		// this.stpTexture = this.resources.items.stpTexture

		// Physics

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
		// this.stpPlane = new ProjectPlane(this.skillsTexture, 'stpPlane', 'stpPlane')
		this.rmjPlane = new ProjectPlane(this.rmjTexture, 'rmjPlane', 'rmjPlane')

		// this.spaceOverlay = new PortalOverlay(
		// 	'spaceOverlay',
		// 	'spaceOverlay',
		// 	-158,
		// 	39,
		// 	-238,
		// 	6.6,
		// 	0.9,
		// 	0.3,
		// 	0
		// )
		// this.eldiaOverlay = new PortalOverlay(
		// 	'eldiaOverlay',
		// 	'eldiaOverlay',
		// 	215,
		// 	40,
		// 	63.8,
		// 	4.7,
		// 	0.6,
		// 	0.3,
		// 	0.7
		// )
		this.stpOverlay = new PortalOverlay(
			'stpOverlay',
			'stpOverlay',
			-96.5,
			11.2,
			-115.7,
			7.8,
			0.5,
			0.7,
			1.0
		)
		// this.rmjOverlay = new PortalOverlay(
		// 	'rmjOverlay',
		// 	'rmjOverlay',
		// 	-430,
		// 	40,
		// 	-61,
		// 	1.6,
		// 	0.5,
		// 	0.5,
		// 	0.5
		// )

		// this.poi = new PointsOfInterest()
		// instead of doing this could I not just use a raycaster and cause an html element to appear on screen?
		// this.raycaster = new Raycaster(
		// 	this.resource,
		// 	this.camera.controls.object.position
		// )

		// Methods
		this.setModel()

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('landscape')
		}
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)
		this.model.scale.set(10, 10, 10)

		// this.model.traverse((c) => {
		// 	if (c instanceof THREE.Mesh) {
		// 		c.material = this.bakedMaterial
		// 	}
		// })
		this.scene.add(this.model)
		this.model2 = this.resourceForMaterial.scene
		console.log(this.model2)
		this.model2.scale.set(10, 10, 10)
		this.scene.add(this.model2)

		this.modelArrows = this.resourceArrows.scene
		this.modelSigns = this.resourceSigns.scene
		this.modelArrows.scale.set(10, 10, 10)
		this.modelSigns.scale.set(10, 10, 10)
		this.scene.add(this.modelSigns)

		this.scene.add(this.modelArrows)
		// FIND MODELS
		// this.bakedModel = this.model.children.find((child) => child.name === 'baked')

		// this.seaMesh = this.model.children.find((child) => child.name === 'sea')
		// this.seaMesh.removeFromParent()

		// this.newSeaGeometry = new THREE.PlaneGeometry(1000, 1000, 128, 128)
		// this.newSeaMaterial = this.lakeMaterial.material
		// this.newSeaMesh = new THREE.Mesh(this.newSeaGeometry, this.newSeaMaterial)
		// this.newSeaMesh.rotation.x = -Math.PI * 0.5
		// this.newSeaMesh.position.y = -10
		// this.newSeaMesh.position.x = -99
		// this.scene.add(this.newSeaMesh)

		// this.fireMesh = this.model.children.find(
		// 	(child) => child.name === 'firepitPlane001'
		// )
		// this.greenCircle = this.model.children.find(
		// 	(child) => child.name === 'greenCircle'
		// )

		// this.treeMed = this.model.children.find(
		// 	(child) => child.name === 'treeLeavesMed'
		// )

		// for (let i = 0; i < this.model.children.length; i++) {
		// 	switch (this.model.children[i].name) {
		// 		case 'greenPoint':
		// 			this.greenPoint = this.model.children[i]
		// 			this.greenPoint.material = this.bakedMaterial
		// 			break
		// 		case 'redPoint':
		// 			this.redPoint = this.model.children[i]
		// 			this.redPoint.material = this.bakedMaterial
		// 			break
		// 		case 'yellowPoint':
		// 			this.yellowPoint = this.model.children[i]
		// 			this.yellowPoint.material = this.bakedMaterial
		// 			break
		// 		case 'bluePoint':
		// 			this.bluePoint = this.model.children[i]
		// 			this.bluePoint.material = this.bakedMaterial
		// 			break
		// 		case 'purplePoint':
		// 			this.purplePoint = this.model.children[i]
		// 			this.purplePoint.material = this.bakedMaterial
		// 			break
		// 		case 'stonesBoard':
		// 			this.stonesBoard = this.model.children[i]
		// 			this.stonesBoard.material = this.bakedMaterial
		// 			break
		// 		case 'purpleBoard':
		// 			this.purpleBoard = this.model.children[i]
		// 			this.purpleBoard.material = this.bakedMaterial
		// 			break
		// 		case 'greenBoard':
		// 			this.greenBoard = this.model.children[i]
		// 			this.greenBoard.material = this.bakedMaterial
		// 			break
		// 		case 'redBoard':
		// 			this.redBoard = this.model.children[i]
		// 			this.redBoard.material = this.bakedMaterial
		// 			break
		// 		case 'blueBoard':
		// 			this.blueBoard = this.model.children[i]
		// 			this.blueBoard.material = this.bakedMaterial
		// 			break
		// 		case 'yellowBoard':
		// 			this.yellowBoard = this.model.children[i]
		// 			this.yellowBoard.material = this.bakedMaterial
		// 			break
		// 		default:
		// 			break
		// 	}
		// }

		// // MATERIALS
		// // this.seaMesh.material = this.lakeMaterial
		// this.fireMesh.material = this.sunMaterial.material
		// this.bakedModel.material = this.bakedMaterial
		// this.treeMed.material = this.treeLeavesMedMaterial
		// this.greenCircle.material = this.portalMaterial.material
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.model.position, 'y')
				.min(-30)
				.max(30)
				.step(1)
				.name('y model')
		}
	}

	update() {
		// this.portalMaterial.update()
		// this.lakeMaterial.update()
		// this.sunMaterial.update()
		// this.spaceOverlay.update()
		// this.eldiaOverlay.update()
		this.stpOverlay.update()
		// this.fullOverlay.update()
		// this.poi.update()
		// this.raycaster.update()
		// this.postProcessing.update()
	}
}
