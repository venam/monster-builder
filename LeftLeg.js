function LeftLeg(game) {
	var sprite = game.add.sprite(0, 0,'knight_left_leg');

	// call the constructor of the parent
	BodyPart.call(
			this,
			game, //game reference
			'knight left leg', //the name of the part
			'left_leg', //the type of the part
			sprite, //the sprite drawn for the part
			-3, //the stack order
			{x: 0.45, y:0.1}, //the anchor point
			[ //the sticky parts
			],
			{x: 150, y:300}, //initial position
			true //DEBUG
			);
	this.state = 0;

	//Allow dragging
	//Input Enable the sprites
	this.phantomSprite.inputEnabled = true;
	//Allow dragging - the 'true' parameter will make the phantomSprite snap to the center
	this.phantomSprite.input.useLeftLegCursor = true;
	this.phantomSprite.input.enableDrag(true);
}


//inheritance from BodyPart
LeftLeg.prototype = Object.create(BodyPart.prototype, {
/*	update: {
	value: LeftLeg.prototype.update,
	enumerable: true,
	configurable: true,
	writable: true
	} */
});
LeftLeg.prototype.constructor = LeftLeg;


LeftLeg.prototype.update = function() {
	BodyPart.prototype.update.apply(this);
};
