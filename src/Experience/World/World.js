import Experience from '../Experience.js'
import Environment from './Environment.js'
import TestCube from './testCube.js'
import Landscape from './Landscape.js'
import Fox from './Fox.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		// this.cube = new TestCube()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			// this.fox = new Fox()
			this.landscape = new Landscape()
		})
	}

	update() {}
}
