export default [
	{
		name: 'environmentMapTexture',
		type: 'cubeTexture',
		path: [
			'textures/environmentMap/px.png',
			'textures/environmentMap/nx.png',
			'textures/environmentMap/py.png',
			'textures/environmentMap/ny.png',
			'textures/environmentMap/pz.png',
			'textures/environmentMap/nz.png',
		],
	},
	{
		name: 'forestMerged',
		type: 'gltfModel',
		path: 'models/Landscape/forestMerged.glb',
	},
	{
		name: 'foxModel',
		type: 'gltfModel',
		path: 'models/Fox/glTF/Fox.gltf',
	},
	{
		name: 'bakedTexture',
		type: 'texture',
		path: 'models/Landscape/BAKED.jpg',
	},
]
