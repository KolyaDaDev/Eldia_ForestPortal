import * as THREE from 'three'
import Experience from '../../Experience'

export default class ChangeEnvMap {
	constructor() {
		this.experience = new Experience()
		this.env = this.experience.world.environment
		this.changeButton = document.querySelector('.changeEnv')

		this.changeButton.addEventListener('click', () => {
			this.env.setEnvironmentMap()
		})
	}
}
