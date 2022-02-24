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
		name: 'bakedTexture',
		type: 'texture',
		path: 'models/Landscape/BAKED.jpg',
	},
	{
		name: 'BasicTreeM',
		type: 'gltfModel',
		path: 'models/Tree/glTF-Binary/tree.glb',
	},
	{
		name: 'basicTreeL',
		type: 'gltfModel',
		path: 'models/Tree2/glTF-Binary/tree_2_fini.glb',
	},
]
