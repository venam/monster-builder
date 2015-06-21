function Hand(game,position) {
	var sprite = game.add.sprite(0, 0,'pipe');
	// call the constructor of the parent
	BodyPart.call(
			this,
			game, //game reference
			'hand test', //the name of the part
			'hand', //the type of the part
			sprite, //the sprite drawn for the part
			-2, //the stack order
			{x: 0.45, y:0.2}, //the anchor point
			[ //the sticky parts
			],
			position, //initial position
			true //DEBUG
			);
	this.state = 0;

	//Allow dragging
	//Input Enable the sprites
	this.phantomSprite.inputEnabled = true;
	//Allow dragging - the 'true' parameter will make the phantomSprite snap to the center
	this.phantomSprite.input.useHandCursor = true;
	this.phantomSprite.input.enableDrag(true);
}


//inheritance from BodyPart
Hand.prototype = Object.create(BodyPart.prototype, {
	/*	update: {
		value: Hand.prototype.update,
		enumerable: true,
		configurable: true,
		writable: true
		} */
});
Hand.prototype.constructor = Hand;


Hand.prototype.update = function() {
	if (this.phantomSprite.angle < 40 && this.state === 0) {
		this.phantomSprite.angle += 0.5;
	}
	if (this.phantomSprite.angle === 40 && this.state === 0) {
		this.state = 1;
	}
	if (this.phantomSprite.angle > -50 && this.state === 1) {
		this.phantomSprite.angle -= 0.5
	}
	if (this.phantomSprite.angle === -50 && this.state === 1) {
		this.state = 0;
	}
	BodyPart.prototype.update.apply(this);
};
