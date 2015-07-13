// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(490, 400, Phaser.AUTO, 'gameDiv');


// Create our 'main' state that will contain the game
var mainState = {
	preload: function() {
		// executed at the beginning to load assets
		
		// change the background color of the game
		game.stage.backgroundColor = '#606060';

		//load all the spritesheets
		AssetsLoader.loadAllAssets(game);
	},

	create: function() {
		// called after preload
		// used to display sprites and set up the game initial state

		// set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var DEBUG = false;
		this.allBodyParts = [
			new Torso(game, DEBUG),
			new Head(game, DEBUG),
			new Eyes(game, 'knight_eyes_angry', 400, 300, DEBUG),
			new Eyes(game, 'knight_eyes', 440, 300, DEBUG),
			new RightLeg(game, DEBUG),
			new LeftLeg(game, DEBUG),
	 		new FrontArm(game, DEBUG),
			new BackArm(game, DEBUG),
		];
		//this.addBodyParts(game);
		//text = game.add.text(16, 16, 'Overlapping: false', {fill: '#FFFFFF'});
		//game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function () {
		//	a(param1, param2);
		//}, this);
	},

	update: function() {
		// this function is called 60 times per seconds
		// contains the game logic
		for (var i in this.allBodyParts) {
			this.allBodyParts[i].update();
			for (var j in this.allBodyParts) {
				if (this.allBodyParts[i].touchListener(this.allBodyParts[j])) {
					break;
				}
			}
		}
	},
	
	render: function() {
	}
};


mainState.addBodyParts = function(game) {
	this.allBodyParts = [
		new Torso(game)
	];
};


game.state.add('main', mainState);
game.state.start('main');
