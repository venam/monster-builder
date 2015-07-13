// create a namespace for the AssetsLoader
// the assets can then be used later on in the body parts
var AssetsLoader = {
	allSpritesAssets: {
		'bird': {
			'location': 'assets/bird.png',
			'width': 20,
			'height': 20,
			'numberOfFrames': 2
		},
		'angry_head': {
			'location': 'assets/head_sprite.png',
			'width': 26,
			'height': 35,
			'numberOfFrames': 3
		},
		'pipe': {
			'location': 'assets/pipe.png',
			'width': 20,
			'height': 20,
			'numberOfFrames': 2
		},
		'knight_torso': {
			'location': 'assets/knight_body.png',
			'width':  52,
			'height': 42,
			'numberOfFrames': 1
		},
		'knight_head': {
			'location': 'assets/knight_head.png',
			'width': 60,
			'height': 60
		},
		'knight_back_arm': {
			'location': 'assets/knight_back_arm.png',
			'width': 30,
			'height': 46
		},
		'knight_right_leg': {
			'location': 'assets/knight_right_leg.png',
			'width': 30,
			'height': 28
		},
		'knight_left_leg': {
			'location': 'assets/knight_left_leg.png',
			'width': 30,
			'height': 28
		},
		'knight_front_arm': {
			'location': 'assets/knight_front_arm.png',
			'width': 30,
			'height': 46
		},
		'knight_eyes': {
			'location': 'assets/knight_eyes.png',
			'width': 38,
			'height': 18
		},
		'knight_eyes_angry': {
			'location': 'assets/knight_eyes_angry.png',
			'width': 38,
			'height': 18
		}
	},

	allSoundsAssets: {
	},

	loadAllAssets: function(game) {
		this.loadAllSprites(game);
		this.loadAllSounds(game);
	},

	loadAllSprites: function(game) {
		for (var i in this.allSpritesAssets) {
			// name, assets, width, height, nbframes
			game.load.spritesheet(
				i,
				this.allSpritesAssets[i].location,
				this.allSpritesAssets[i].width,
				this.allSpritesAssets[i].height,
				this.allSpritesAssets[i].numberOfFrames
			);
		}
	},

	loadAllSounds: function(game) {
		for (var i in this.allSoundsAssets) {
			// how to sound
			game.load.audio(
				i,
				this.allSoundsAssets[i].location
			);
		}
	}

};
