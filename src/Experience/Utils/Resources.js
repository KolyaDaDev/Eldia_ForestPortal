import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import Experience from '../Experience'
import gsap from 'gsap'
export default class Resources extends EventEmitter {
	constructor(sources) {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		// HELPER SCREEN and LOADING BAR/TEXT
		this.playButton = document.getElementById('play')
		this.instructions = document.querySelector('.instructions')
		this.loadingBarElement = document.querySelector('.loading-bar')
		this.loadingBarText = document.querySelector('.loadingText')

		this.playButton.addEventListener('click', (e) => {
			gsap.to(this.overlayMat.uniforms.uAlpha, {
				duration: 3,
				value: 0,
				delay: 1,
			})
			this.instructions.classList.remove('visible')
			setTimeout(() => {
				this.instructions.style.display = 'none'
				this.loadingBarText.style.display = 'none'
			}, 3000)
		})

		this.addLoadScreen()

		this.loadingManager = new THREE.LoadingManager(
			// activate when loaded
			() => {
				window.setTimeout(() => {
					// overlay animation

					// update loading element
					this.loadingBarElement.classList.add('ended')
					this.loadingBarText.classList.add('ended')
					this.loadingBarElement.style.transform = ''
					this.playButton.classList.remove('hide')
				}, 500)
			},
			// activate during progression
			(itemUrl, itemsLoaded, itemsTotal) => {
				// calculate progress and transform loading loadingBarElement
				const progressRatio = itemsLoaded / itemsTotal
				this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
			}
		)

		this.setLoaders()
		this.startLoading()
	}

	addLoadScreen() {
		this.overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1)
		this.overlayMat = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 1 },
			},
			vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
			fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
        }
    `,
		})

		this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat)
		this.scene.add(this.overlay)
	}

	setLoaders() {
		this.loaders = {}

		this.loaders.dracoLoader = new DRACOLoader(this.loadingManager)
		this.loaders.dracoLoader.setDecoderPath('/draco/')
		this.loaders.FBXLoader = new FBXLoader()

		this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)

		this.loaders.gltfLoader.dracoLoader = this.loaders.dracoLoader

		this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
			this.loadingManager
		)
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'FBXModel') {
				this.loaders.FBXLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file

		this.loaded++

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}
