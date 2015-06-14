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
		'pipe': {
			'location': 'assets/pipe.png',
			'width': 20,
			'height': 20,
			'numberOfFrames': 2
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
