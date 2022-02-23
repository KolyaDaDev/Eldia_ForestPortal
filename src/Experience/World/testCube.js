import * as THREE from 'three'
import Experience from '../Experience.js'

export default class TestCube {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.createCube()
	}

	createCube() {
		let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		let geometry = new THREE.BoxGeometry(1, 1, 1)
		const cube = new THREE.Mesh(geometry, material)
		this.scene.add(cube)
	}
}
