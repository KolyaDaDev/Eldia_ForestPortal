export default [
	{
		name: 'envMap2Texture',
		type: 'cubeTexture',
		path: [
			'textures/envMap/px.png',
			'textures/envMap/nx.png',
			'textures/envMap/py.png',
			'textures/envMap/ny.png',
			'textures/envMap/pz.png',
			'textures/envMap/nz.png',
		],
	},

	// {
	// 	name: 'bakedTexture',
	// 	type: 'texture',
	// 	path: 'models/nikoForest/baked.jpg',
	// },

	{
		name: 'spaceTexture',
		type: 'texture',
		path: 'textures/spaceProject/nikodevCover1.jpg',
	},
	{
		name: 'eldiaTexture',
		type: 'texture',
		path: 'textures/eldia/eldia.jpg',
	},
	{
		name: 'rmjTexture',
		type: 'texture',
		path: 'textures/rmj/rmjTexture.jpg',
	},
	// {
	// 	name: 'stp',
	// 	type: 'texture',
	// 	path: 'textures/stp/stp.png',
	// },

	// models

	{
		name: 'modelForBake',
		type: 'gltfModel',
		path: 'models/nikoForest/modelForBake.glb',
	},

	{
		name: 'modelForMaterial',
		type: 'gltfModel',
		path: 'models/nikoForest/modelForMaterial.glb',
	},

	// {
	// 	name: 'logs',
	// 	type: 'gltfModel',
	// 	path: 'models/nikoForest/logs.glb',
	// },
	{
		name: 'arrows',
		type: 'gltfModel',
		path: 'models/nikoForest/arrows.glb',
	},
	{
		name: 'signs',
		type: 'gltfModel',
		path: 'models/nikoForest/signs.glb',
	},
	// character
	{
		name: 'Vanguard',
		type: 'FBXModel',
		path: 'models/character/Vanguard.fbx',
	},
	{
		name: 'idle',
		type: 'FBXModel',
		path: 'models/character/WarriorIdle.fbx',
	},
	{
		name: 'dance',
		type: 'FBXModel',
		path: 'models/character/dance.fbx',
	},
	{
		name: 'run',
		type: 'FBXModel',
		path: 'models/character/run.fbx',
	},
	{
		name: 'walk',
		type: 'FBXModel',
		path: 'models/character/walk.fbx',
	},
]
