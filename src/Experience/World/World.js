import Experience from '../Experience.js'
import Environment from './Environment.js'

import Landscape from './Landscape.js'

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
			this.landscape = new Landscape()
		})
	}

	update() {
		if (this.landscape) this.landscape.update()
	}
}
