function Torso(game, DEBUG) {
	var sprite = game.add.sprite(0, 0,'knight_torso');
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
			{x:30, y:7, type:'head'},
			{x:40, y:4, type:'back_arm'},
			{x:4, y:6, type:'front_arm'},
			{x:35, y:30, type:'right_leg'},
			{x:13, y:30, type:'left_leg'},
		],
		{x: 200, y:200}, //initial position
		DEBUG //DEBUG
	);
	this.state = 0;
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
