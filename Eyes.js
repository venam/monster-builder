function Eyes(game, eyeName, x, y, DEBUG) {
	var sprite = game.add.sprite(0, 0, eyeName);

	// call the constructor of the parent
	BodyPart.call(
			this,
			game, //game reference
			'knight eyes', //the name of the part
			'eyes', //the type of the part
			sprite, //the sprite drawn for the part
			3, //the stack order
			{x: 0.45, y:0.5}, //the anchor point
			[ //the sticky parts
			],
			{x:x, y:y}, //initial position
			DEBUG //DEBUG
			);
	this.state = 0;
}


//inheritance from BodyPart
Eyes.prototype = Object.create(BodyPart.prototype, {
/*	update: {
	value: Eyes.prototype.update,
	enumerable: true,
	configurable: true,
	writable: true
	} */
});
Eyes.prototype.constructor = Eyes;


Eyes.prototype.update = function() {
	BodyPart.prototype.update.apply(this);
};
