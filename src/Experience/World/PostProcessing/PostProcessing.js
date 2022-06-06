import * as THREE from 'three'
import Experience from '../../Experience'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

export default class PostProcessing {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera.instance
		this.renderer = this.experience.renderer.instance
		this.sizes = this.experience.sizes

		this.createRender()
	}

	createRender() {
		console.log('render renderTarget')
		this.renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			encoding: THREE.sRGBEncoding,
		})
		this.effectComposer = new EffectComposer(this.renderer, this.renderTarget)
		this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.effectComposer.setSize(this.sizes.width, this.sizes.height)

		this.renderPass = new RenderPass(this.scene, this.camera)
		this.effectComposer.addPass(this.renderPass)

		this.glitch = new GlitchPass()
		this.glitch.enabled = true
		this.effectComposer.addPass(this.glitch)
	}

	update() {
		this.effectComposer.render()
	}
}
