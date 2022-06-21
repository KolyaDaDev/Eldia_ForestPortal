import * as THREE from 'three'
import CANNON from 'cannon'
import Experience from '../../Experience'

export default class Physics {
	constructor(charPosition) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.hitSound = new Audio('./sounds/hit.mp3')

		console.log('physics instantiated')

		// THREE JS WORLD
		this.sphereGeometry = new THREE.SphereGeometry(10, 20, 20)
		this.sphereMaterial = new THREE.MeshStandardMaterial({
			metalness: 1.0,
			roughness: 0,
		})
		this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
		this.scene.add(this.sphere)

		// this.cubeGeometry = new THREE.BoxGeometry(10, 10, 10, 10, 10)
		// this.cubeMaterial = new THREE.MeshBasicMaterial({
		//     color: "#000",
		//     transparent: true
		// })
		// this.cube = new THREE.Mesh(this.cubeGeometry, this.sphereMaterial)
		// this.scene.add(this.cube)

		// PHYSICS WORLD
		this.world = new CANNON.World()
		this.world.broadphase = new CANNON.SAPBroadphase(this.world)
		this.world.allowSleep = true
		this.world.gravity.set(0, -90.82, 0)

		// materials
		this.defaultMaterial = new CANNON.Material('default')
		this.defaultContactMaterial = new CANNON.ContactMaterial(
			this.defaultMaterial,
			this.defaultMaterial,
			{
				friction: 0.1,
				restitution: 0.9,
			}
		)
		this.world.addContactMaterial(this.defaultContactMaterial)
		this.world.defaultContactMaterial = this.defaultContactMaterial

		// SHAPES

		// sphere
		this.sphereShape = new CANNON.Sphere(10)
		this.sphereBody = new CANNON.Body({
			mass: 1,
			position: new CANNON.Vec3(20, 10, 20),
			shape: this.sphereShape,
			material: this.defaultMaterial,
		})
		// this.sphereBody.applyLocalForce(
		// 	new CANNON.Vec3(350, 0, 0),
		// 	new CANNON.Vec3(0, 0, 0)
		// )
		this.world.addBody(this.sphereBody)

		// cube
		this.boxShape = new CANNON.Box(new CANNON.Vec3(5, 8, 5))
		this.boxBody = new CANNON.Body({
			mass: 1,
			shape: this.boxShape,
			material: this.defaultMaterial,
		})
		this.boxBody.addEventListener('collide', () => {
			this.playHitSound()
		})
		this.world.addBody(this.boxBody)

		// floor
		this.floorShape = new CANNON.Plane()
		this.floorBody = new CANNON.Body()
		this.floorBody.mass = 0 // means it will not move
		this.floorBody.addShape(this.floorShape)
		this.floorBody.quaternion.setFromAxisAngle(
			new CANNON.Vec3(-1, 0, 0),
			Math.PI * 0.5
		)
		// this.floorBody.material = this.defaultMaterial
		this.floorBody.position.y = -2
		this.world.addBody(this.floorBody)

		// physics step calculate
		this.clock = new THREE.Clock()
		this.oldElapsedTime = 0

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('physics')
		}
		this.setDebug()
	}

	playHitSound() {
		this.hitSound.play()
	}
	setDebug() {
		if (this.debug.active) {
		}
	}

	update(charPosition) {
		// update physics world
		this.elapsedTime = this.clock.getElapsedTime()
		this.deltaTime = this.elapsedTime - this.oldElapsedTime
		this.oldElapsedTime = this.elapsedTime
		// console.log(this.deltaTime)
		this.world.step(1 / 60, this.deltaTime, 3)
		// console.log(this.sphereBody.position.y)

		// add wind force effect over time
		// this.sphereBody.applyForce(
		// 	new CANNON.Vec3(-1, 0, 0),
		// 	this.sphereBody.position
		// )

		this.sphere.position.copy(this.sphereBody.position)
		// this.sphere.position.x = this.sphereBody.position.x
		// this.sphere.position.y = this.sphereBody.position.y
		// this.sphere.position.z = this.sphereBody.position.z

		// this.cube.position.copy(charPosition)
		this.boxBody.position.copy(charPosition)
	}
}
