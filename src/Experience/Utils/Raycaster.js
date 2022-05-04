import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor(sceneResource, camPos) {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		// this.resources = this.experience.resources
		// this.resource = this.resources.items.Greyfield
		this.resource = sceneResource
		this.cameraPosition = camPos
		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// create Raycaster
		this.createRaycaster()

		// create event listeners
		this.showSign = false
		this.infoBox = document.querySelector('.infoBox')
	}

	createRaycaster() {
		// this.rayOrigin = this.camera.controls.getObject().position
		this.rayOrigin = this.cameraPosition
		this.rayDirection = new THREE.Vector3(0, 0, 1)
		this.rayDirection.normalize()

		this.raycaster = new THREE.Raycaster(this.rayOrigin, this.rayDirection, 0, 3)

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			// lol the pointer lock is locking the mouse at one coord on screen!
			this.trigger('mousemoved')
		})
	}

	showNotice(board) {
		switch (board) {
			case 'stonesBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Some weird alien rocks...'
				console.log('added visible')
				break
			case 'redBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML =
					'Project Eldia - A full stack application using MongoDB, Express, React, Node. Currently underdevelopment. Aim is to become a fully interactive MMORPG using ThreeJS as the 3D generator.  '
				console.log('added visible')
				break
			case 'purpleBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML =
					'A static PWA made with Gatsby for a local Judo club.'
				console.log('added visible')
				break
			case 'greenBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Random mysterious portal...'
				break
			case 'blueBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Enter to visit my linkedIn page and get in touch'

				break
			case 'yellowBoard':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML =
					'A Basic portfolio template mixing ThreeJS and standard FrontEnd web technologies.'

				break
			case 'yellowPoint':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Space Theme Portfolio Project'

				break
			case 'redPoint':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Project Eldia'

				break
			case 'greenPoint':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Mysterious Green Portal'
				console.log('added')
				break
			case 'bluePoint':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Social'
				break
			case 'purplePoint':
				this.showSign = true
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Gatsby PWA'
				break
			default:
				break
		}

		setTimeout(() => {
			this.infoBox.classList.remove('visible')
			this.showSign = false
		}, 4000)
	}
	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.resource.scene.children
		)

		if (this.intersectObjects.length) {
			this.distanceToObject = this.intersectObjects[0].object
			switch (this.distanceToObject.name) {
				case 'stonesBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'redBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'purpleBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'greenBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'blueBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'yellowBoard':
					this.showNotice(this.distanceToObject.name)

					break
				case 'yellowPoint':
					this.showNotice(this.distanceToObject.name)

					break
				case 'redPoint':
					this.showNotice(this.distanceToObject.name)

					break
				case 'greenPoint':
					this.showNotice(this.distanceToObject.name)

					break
				case 'bluePoint':
					this.showNotice(this.distanceToObject.name)

					break
				case 'purplePoint':
					this.showNotice(this.distanceToObject.name)

					break

				default:
					break
			}
		}
	}
}
