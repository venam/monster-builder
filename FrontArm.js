function FrontArm(game, DEBUG) {
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
		DEBUG //DEBUG
	);
	this.state = 0;
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
