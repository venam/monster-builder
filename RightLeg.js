function RightLeg(game) {
	var sprite = game.add.sprite(0, 0,'knight_right_leg');

	// call the constructor of the parent
	BodyPart.call(
			this,
			game, //game reference
			'knight right leg', //the name of the part
			'right_leg', //the type of the part
			sprite, //the sprite drawn for the part
			-4, //the stack order
			{x: 0.45, y:0.1}, //the anchor point
			[ //the sticky parts
			],
			{x: 30, y:300}, //initial position
			true //DEBUG
			);
	this.state = 0;
}


//inheritance from BodyPart
RightLeg.prototype = Object.create(BodyPart.prototype, {
/*	update: {
	value: RightLeg.prototype.update,
	enumerable: true,
	configurable: true,
	writable: true
	} */
});
RightLeg.prototype.constructor = RightLeg;


RightLeg.prototype.update = function() {
	BodyPart.prototype.update.apply(this);
};
