function Torso(game) {
	var sprite = game.add.sprite(0, 0,'bird');
	// call the constructor of the parent
	BodyPart.call(
		this,
		game, //game reference
		'torso', //the name of the part
		'torso', //the type of the part
		sprite, //the sprite drawn for the part
		0, //the stack order
		{x: 0.5, y:0.5}, //the anchor point
		[ //the sticky parts
			{x:20, y:0, type:'shoulder'},
			{x:0, y:0, type:'shoulder2'},
			{x:20, y:20, type:'rightleg'},
			{x:0, y:20, type:'leftleg'},
		],
		{x: 200, y:200}, //initial position
		true //DEBUG
	);
	this.state = 0;

	//Allow dragging
	//Input Enable the sprites
	this.phantomSprite.inputEnabled = true;
	//Allow dragging - the 'true' parameter will make the phantomSprite snap to the center
	this.phantomSprite.input.enableDrag(true);
	this.phantomSprite.events.onInputDown.add(this.clickListener, this);
	this.phantomSprite.input.useHandCursor = true;
}


//inheritance from BodyPart
Torso.prototype = Object.create(BodyPart.prototype, {
/*	update: {
		value: Torso.prototype.update,
		enumerable: true,
		configurable: true,
		writable: true
	} */
});
Torso.prototype.constructor = Torso;

//
//Torso.prototype.update = function() {
//	if (this.phantomSprite.angle < 40 && this.state === 0) {
//		this.phantomSprite.angle += 0.5;
//	}
//	if (this.phantomSprite.angle === 40 && this.state === 0) {
//		this.state = 1;
//	}
//	if (this.phantomSprite.angle > -50 && this.state === 1) {
//		this.phantomSprite.angle -= 0.5
//	}
//	if (this.phantomSprite.angle === -50 && this.state === 1) {
//		this.state = 0;
//	}
//	BodyPart.prototype.update.apply(this);
//};


Torso.prototype.clickListener = function(sprite) {
	console.log("torso was clicked");
};
