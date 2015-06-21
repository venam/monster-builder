function Head(game) {
	var sprite = game.add.sprite(0, 0,'angry_head');
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
			10, //the stack order
			{x: 0.45, y:0.9}, //the anchor point
			[ //the sticky parts
			],
			{x: 300, y:300}, //initial position
			false //DEBUG
			);
	this.state = 0;

	//Allow dragging
	//Input Enable the sprites
	this.phantomSprite.inputEnabled = true;
	//Allow dragging - the 'true' parameter will make the phantomSprite snap to the center
	this.phantomSprite.input.useHeadCursor = true;
	this.phantomSprite.input.enableDrag(true);
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
