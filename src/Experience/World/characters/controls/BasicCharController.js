import * as THREE from 'three'
import BasicCharacterControllerInput from './BasicCharControllerInput.js'
import BasicCharControlProxy from './BasicCharControlProxy'
import CharacterFSM from './CharacterFSM.js'
import Experience from '../../../Experience'

export default class BasicCharController {
	constructor(params) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.vanguard = this.resources.items.Vanguard

		this.idle = this.resources.items.idle

		this.dance = this.resources.items.dance
		this.run = this.resources.items.run
		this.walk = this.resources.items.walk

		// telportation
		this.teleportInProgress = false

		this._Init(params)
	}

	_Init(params) {
		this._params = params
		this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0)
		this._acceleration = new THREE.Vector3(1, 0.25, 15.0)
		this._velocity = new THREE.Vector3(0, 0, 0)
		this._position = new THREE.Vector3()

		this._animations = {}
		this._input = new BasicCharacterControllerInput()
		this._stateMachine = new CharacterFSM(
			new BasicCharControlProxy(this._animations)
		)
		this._LoadModels()
	}

	_LoadModels() {
		this.vanguard.scale.setScalar(0.1)
		this.vanguard.traverse((c) => {
			c.castShadow = true
		})

		this._target = this.vanguard
		this._params.scene.add(this._target)
		this._mixer = new THREE.AnimationMixer(this._target)
		this._manager = new THREE.LoadingManager()

		const _OnLoad = (animName, anim) => {
			const clip = anim.animations[0]
			const action = this._mixer.clipAction(clip)

			this._animations[animName] = {
				clip,
				action,
			}
		}

		_OnLoad('idle', this.idle)
		_OnLoad('dance', this.dance)
		_OnLoad('run', this.run)
		_OnLoad('walk', this.walk)
		this._stateMachine.SetState('idle')

		// loader.load('static/assets/fbx/vanguard.fbx', (fbx) => {
		// 	fbx.scale.setScalar(0.1)
		// 	fbx.traverse((c) => {
		// 		c.castShadow = true
		// 	})
		// 	this._target = fbx
		// 	console.log(this._target)
		// 	this._params.scene.add(this._target)

		// 	this._mixer = new THREE.AnimationMixer(this._target)

		// 	this._manager = new THREE.LoadingManager()

		// 	this._manager.onLoad = () => {
		// 		this._stateMachine.SetState('idle')
		// 	}

		// 	const _OnLoad = (animName, anim) => {
		// 		const clip = anim.animations[0]
		// 		const action = this._mixer.clipAction(clip)

		// 		this._animations[animName] = {
		// 			clip,
		// 			action,
		// 		}
		// 	}

		// 	const loader = new FBXLoader(this._manager)
		// 	loader.setPath('static/assets/fbx/')
		// 	loader.load('idle.fbx', (a) => {
		// 		// console.log(a, 'idle fbx')
		// 		_OnLoad('idle', a)
		// 	})
		// 	loader.load('dance.fbx', (a) => {
		// 		_OnLoad('dance', a)
		// 	})
		// 	loader.load('run.fbx', (a) => {
		// 		_OnLoad('run', a)
		// 	})
		// 	loader.load('walk.fbx', (a) => {
		// 		_OnLoad('walk', a)
		// 	})
		// })
	}
	teleportToEldia() {
		console.log('teleported!')
		this.teleportInProgress = true
		this.teleportScreen = document.querySelector('.teleportScreen')

		this.teleportScreen.style.transform = `scaleX(1)`

		// this.TeleportOverlay = new TeleportOverlay(
		// 	'TeleportOverlay',
		// 	'TeleportOverlay'
		// )
		// console.log('overlay added!')

		// gsap.to(this.TeleportOverlay.material.uniforms.uAlpha, {
		// 	duration: 3,
		// 	value: 1,
		// })
		setTimeout(() => {
			window.open('https://peaceful-inlet-40638.herokuapp.com/', '_self')
		}, 2000)
	}
	teleportToSkills() {
		console.log('teleported!')
		window.open('https://www.linkedin.com/in/nick-gillham-3bb6971a1/', '_self')
		this.teleportInProgress = true
	}
	teleportToRandom() {
		console.log('teleported!')
		window.open('https://twitter.com/kolyathedev', '_self')
		this.teleportInProgress = true
	}
	teleportToFullFat() {
		console.log('teleported!')
		window.open('https://fullfatgrappling.netlify.app', '_self')
		this.teleportInProgress = true
	}
	teleportToSpace() {
		console.log('teleported!')
		window.open('https://space-portfolio-project.netlify.app', '_self')
		this.teleportInProgress = true
	}

	get Position() {
		return this._position
	}

	get Rotation() {
		if (!this._target) {
			return new THREE.Quaternion()
		}
		return this._target.quaternion
	}

	Update(timeInSeconds) {
		if (!this._target) {
			return
		}

		this._stateMachine.Update(timeInSeconds, this._input)

		const velocity = this._velocity
		const frameDecceleration = new THREE.Vector3(
			velocity.x * this._decceleration.x,
			velocity.y * this._decceleration.y,
			velocity.z * this._decceleration.z
		)
		frameDecceleration.multiplyScalar(timeInSeconds)
		frameDecceleration.z =
			Math.sign(frameDecceleration.z) *
			Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z))

		velocity.add(frameDecceleration)

		const controlObject = this._target
		const _Q = new THREE.Quaternion()
		const _A = new THREE.Vector3()
		const _R = controlObject.quaternion.clone()

		const acc = this._acceleration.clone()
		if (this._input._keys.shift) {
			acc.multiplyScalar(6.0)
		}

		// if (this._stateMachine._currentState.Name === 'dance') {
		// 	acc.multiplyScalar(0.0)
		// }

		if (this._input._keys.forward) {
			velocity.z += acc.z * timeInSeconds * 3
		}
		if (this._input._keys.backward) {
			velocity.z -= acc.z * timeInSeconds * 3
		}
		if (this._input._keys.left) {
			_A.set(0, 1, 0)
			_Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y)
			_R.multiply(_Q)
		}
		if (this._input._keys.right) {
			_A.set(0, 1, 0)
			_Q.setFromAxisAngle(
				_A,
				4.0 * -Math.PI * timeInSeconds * this._acceleration.y
			)
			_R.multiply(_Q)
		}

		controlObject.quaternion.copy(_R)

		const oldPosition = new THREE.Vector3()
		oldPosition.copy(controlObject.position)

		const forward = new THREE.Vector3(0, 0, 1)
		forward.applyQuaternion(controlObject.quaternion)
		forward.normalize()

		const sideways = new THREE.Vector3(1, 0, 0)
		sideways.applyQuaternion(controlObject.quaternion)
		sideways.normalize()

		sideways.multiplyScalar(velocity.x * timeInSeconds)
		forward.multiplyScalar(velocity.z * timeInSeconds * 3)

		controlObject.position.add(forward)
		controlObject.position.add(sideways)

		this._position.copy(controlObject.position)
		if (
			this._position.x > 215 &&
			this._position.x < 218 &&
			this._position.z > 60 &&
			this._position.z < 65 &&
			!this.teleportInProgress
		) {
			this.teleportToEldia()
		} else if (
			this._position.x > -161 &&
			this._position.x < -158 &&
			this._position.z > -240 &&
			this._position.z < -238 &&
			!this.teleportInProgress
		) {
			this.teleportToSpace()
		} else if (
			this._position.x > -435 &&
			this._position.x < -428 &&
			this._position.z > -65 &&
			this._position.z < -58 &&
			!this.teleportInProgress
		) {
			this.teleportToFullFat()
		} else if (
			this._position.x > 15 &&
			this._position.x < 22 &&
			this._position.z > 295 &&
			this._position.z < 302 &&
			!this.teleportInProgress
		) {
			this.teleportToSkills()
		} else if (
			this._position.x > -400 &&
			this._position.x < -396 &&
			this._position.z > 276 &&
			this._position.z < 283 &&
			!this.teleportInProgress
		) {
			this.teleportToRandom()
		}

		if (this._mixer) {
			this._mixer.update(timeInSeconds)
		}
	}
}
