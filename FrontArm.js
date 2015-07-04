function FrontArm(game) {
	var sprite = game.add.sprite(0, 0,'knight_front_arm');
	// call the constructor of the parent
	BodyPart.call(
		this,
		game, //game reference
		'knight_front_arm', //the name of the part
		'front_arm', //the type of the part
		sprite, //the sprite drawn for the part
		1, //the stack order
		{x: 0.5, y:0.1}, //the anchor point
		[ //the sticky parts
		],
		{x: 100, y:100}, //initial position
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
FrontArm.prototype = Object.create(BodyPart.prototype, {
	/*	update: {
		value: FrontArm.prototype.update,
		enumerable: true,
		configurable: true,
		writable: true
		} */
});
FrontArm.prototype.constructor = FrontArm;


FrontArm.prototype.update = function() {
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
