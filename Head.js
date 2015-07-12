function Head(game) {
	var sprite = game.add.sprite(0, 0,'knight_head');
	// add(name, frames, frameRate, loop, useNumericIndex) 
	sprite.animations.add('movehead', [1,2,3], 2, true);
	// play(name, frameRate, loop, killOnComplete) 
	sprite.animations.play('movehead', 2, true);

	// call the constructor of the parent
	BodyPart.call(
			this,
			game, //game reference
			'head test', //the name of the part
			'head', //the type of the part
			sprite, //the sprite drawn for the part
			3, //the stack order
			{x: 0.45, y:0.9}, //the anchor point
			[ //the sticky parts
				{x:35, y:36, type:'eyes'},
			],
			{x: 300, y:300}, //initial position
			true //DEBUG
			);
	this.state = 0;
}


//inheritance from BodyPart
Head.prototype = Object.create(BodyPart.prototype, {
/*	update: {
	value: Head.prototype.update,
	enumerable: true,
	configurable: true,
	writable: true
	} */
});
Head.prototype.constructor = Head;


Head.prototype.update = function() {
	BodyPart.prototype.update.apply(this);
};
