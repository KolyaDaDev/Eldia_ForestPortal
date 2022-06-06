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
	// {
	// 	name: 'forestMerged',
	// 	type: 'gltfModel',
	// 	path: 'models/Landscape/forestMerged.glb',
	// },
	{
		name: 'bakedTexture',
		type: 'texture',
		path: 'models/nikoForest/baked.jpg',
	},

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
		name: 'fullFatTexture',
		type: 'texture',
		path: 'textures/fullFat/fullFat.png',
	},
	{
		name: 'skillsTexture',
		type: 'texture',
		path: 'textures/skills/skills.jpg',
	},

	// models

	{
		name: 'forestOfNiko',
		type: 'gltfModel',
		path: 'models/nikoForest/forestOfNikoFinalMerge.glb',
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
