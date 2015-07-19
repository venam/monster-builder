/*
 * This abstract class is used to build up the parts of the monster character
 *
 * TODO: Setter and Getter to be able to do generic parts that are fed the
 * necessary data on the fly
 */

function BodyPart(
		game,
		name,
		type,
		sprite,
		stackOrder,
		anchorPoint,
		stickyParts,
		initialPosition,
		DEBUG) {
	//a reference to the game
	//TODO: check if it really needs to be present as an attribute
	this.game = game;

	//a name for convention to differentiate the different part which are of
	//the same type
	this.name = name;
	//the type of the body part
	// head, horns, eyes, hair, mouth, nose, torso, legs (upper leg, lower leg)
	// feet, shoulders, arms (upper arm, lower arm), hands, wings, accessories
	this.type = type;
	//the main image of the part
	//it's the role of the implementator to add animation to it
	this.sprite = sprite;
	this.sprite.partImage = true;
	//An array with the positions {x: x, y: y, type: type} of the sticky parts,
	//aka the parts that can have another part sticked to them
	this.stickyParts = stickyParts;
	//the anchor point is the position of the center of rotation of the
	//part {x:x, y:y}
	this.anchorPoint = anchorPoint;
	//the name and type of the parent that the part is currently attached to
	//also used as a check to know if the part is attached or not
	this.attachedTo = null;
	//where to place the part at the beginning {x:x, y:y}
	this.initialPosition = initialPosition;
	this.phantomSprite = this.game.add.sprite(this.initialPosition.x, this.initialPosition.y);
	//the stackOrder is an integer that is used to know the superposition of
	//the elements, if it's greater it'll be above
	this.stackOrder = stackOrder;
	this.phantomSprite.anchor.setTo(this.anchorPoint.x, this.anchorPoint.y);

	this.phantomSprite.inputEnabled = true;
	//Allow dragging - the 'true' parameter will make the phantomSprite snap to the center
	this.phantomSprite.input.enableDrag(true);
	this.phantomSprite.events.onInputDown.add(this.clickListener, this);
	this.phantomSprite.input.useHandCursor = true;
	this.phantomContainer =  new Phaser.Group(game,this.phantomSprite);
	this.phantomContainer.add(this.sprite);
	this.sprite.position.x -= (this.sprite.width*this.anchorPoint.x);
	this.sprite.position.y -= (this.sprite.height*this.anchorPoint.y);
	this.phantomSprite.stackOrder = stackOrder;
	this.sprite.stackOrder = stackOrder;
	//if DEBUG is enabled (default: false) it will draw the sticky parts and
	//the anchor point
	this.DEBUG = (DEBUG == null ? false : DEBUG);
	this.drawDebug(game);
	this.touchCounter = 0;
}


BodyPart.prototype.setStackOrder = function(newOrder) {
	this.stackOrder = newOrder;
	this.phantomSprite.stackOrder = this.stackOrder;
	this.sprite.stackOrder = this.stackOrder;
	this.DEBUGAnchor.stackOrder = this.stackOrder;
	//actually update all the children that belongs to this part
	for (var i=0; i< this.phantomContainer.length; i++) {
		var c = this.phantomContainer.getChildAt(i);
		if (c.partImage) {
			c.stackOrder = this.stackOrder;
		}
	}
	//update everything
	//best way is to detach
	this.detachParts();
};


BodyPart.prototype.setAnchorPoint = function(newAnchor) {
	//remove all parts that are not concerned
	this.detachParts();

	//get the difference in position -> to recalibrate everything
	var xDiff = this.anchorPoint.x - newAnchor.x;
	var yDiff = this.anchorPoint.y - newAnchor.y;

	this.anchorPoint = newAnchor;

	this.DEBUGAnchor.destroy();

	this.DEBUGAnchor = game.add.sprite(
		0, 0,
		this.createBitmap(game,{width:5,height:5},"#0000FF")
	);
	this.DEBUGAnchor.anchor.x = this.DEBUGAnchor.anchor.y = 0.25;
	this.DEBUGAnchor.position.x = 0;
	this.DEBUGAnchor.position.y = 0;
	this.DEBUGAnchor.stackOrder = this.stackOrder;
	this.DEBUGAnchor.partImage = true;
	this.phantomContainer.add(this.DEBUGAnchor);

	//loop through phantomContainer and reset the position of subParts
	for (var i=0; i< this.phantomContainer.length; i++) {
		var c = this.phantomContainer.getChildAt(i);
		c.x += xDiff;
		c.y += yDiff;
	}
};


BodyPart.prototype.setStickyParts = function(newSticky) {
	//remove all parts that are not concerned
	this.detachParts();
	//remove all the sticky parts
	for (var i in this.DEBUGStickyParts) {
		this.DEBUGStickyParts[i].destroy();
	}
	//start back from 0
	this.DEBUGStickyParts = [];
	this.stickyParts = newSticky;
	for (var i in this.stickyParts) {
		var sticky = game.add.sprite(
				this.stickyParts[i].x-(this.sprite.width*this.anchorPoint.x),
				this.stickyParts[i].y-(this.sprite.height*this.anchorPoint.y),
				this.createBitmap(game,{width:10,height:10},"#FF0000")
		);
		sticky.anchor.x = sticky.anchor.y = 0.5;
		this.DEBUGStickyParts.push(sticky);
		sticky.stackOrder = this.stackOrder;
		sticky.partImage = true;
		this.phantomContainer.add(sticky);
	}
};


BodyPart.prototype.setType = function(newType) {
	this.type = newType;
};


BodyPart.prototype.setName = function(newName) {
	this.name = newName;
};


BodyPart.prototype.toggleDebug = function() {
	this.DEBUG = !this.DEBUG;
	this.setAnchorPoint(this.anchorPoint);
	this.setStickyParts(this.stickyParts);
}


BodyPart.prototype.setSprite = function(newSprite) {
	//remove the sprite
	this.sprite.destroy();
	//change the current sprite
	this.sprite = newSprite;
	this.sprite.partImage = true;
	this.sprite.stackOrder = this.stackOrder;
	this.sprite.position.x -= (this.sprite.width*this.anchorPoint.x);
	this.sprite.position.y -= (this.sprite.height*this.anchorPoint.y);
	this.detachParts();
	//Add it at the bottom of the stack
	this.phantomContainer.add(this.sprite);
};


//returns a bitmap of size {width:width,height:height} and of color
//it can be used instead of an image for the sprite
BodyPart.prototype.createBitmap = function(game, size, color) {
	if (!this.DEBUG){
		return;
	}
	var bmd = game.add.bitmapData(size.width,size.height);
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,size.width,size.height);
	bmd.ctx.fillStyle = color;
	bmd.ctx.fill();
	return bmd;
};


//draw the anchor point and the sticky parts for visual
//debugging purpose
BodyPart.prototype.drawDebug = function(game) {
	//draw the anchor point
	this.DEBUGAnchor = game.add.sprite(
		0, 0,
		this.createBitmap(game,{width:5,height:5},"#0000FF")
	);
	this.DEBUGAnchor.anchor.x = this.DEBUGAnchor.anchor.y = 0.25;
	this.DEBUGAnchor.position.x = 0;
	this.DEBUGAnchor.position.y = 0;
	this.DEBUGAnchor.stackOrder = this.stackOrder;
	this.DEBUGAnchor.partImage = true;
	this.phantomContainer.add(this.DEBUGAnchor);

	this.DEBUGStickyParts = [];
	for (var i in this.stickyParts) {
		var sticky = game.add.sprite(
				this.stickyParts[i].x-(this.sprite.width*this.anchorPoint.x),
				this.stickyParts[i].y-(this.sprite.height*this.anchorPoint.y),
				this.createBitmap(game,{width:10,height:10},"#FF0000")
		);
		sticky.anchor.x = sticky.anchor.y = 0.5;
		this.DEBUGStickyParts.push(sticky);
		sticky.stackOrder = this.stackOrder;
		sticky.partImage = true;
		this.phantomContainer.add(sticky);
	}
};


//put back on top the debugging draw
BodyPart.prototype.updateDebug = function() {
};


// Checks if a part anchor touches one of the sticky part of another
BodyPart.prototype.touchListener = function(otherPart) {
	//attaching
	if (! game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
		return this.attachPart(otherPart);
	}
};


BodyPart.prototype.clickListener = function(sprite) {
	//detaching
	if ( game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
		return this.detachParts();
	}
};


BodyPart.prototype.detachParts = function(game) {
	//fetch the non neede parts
	var nonNeededParts = [];
	for (var i=0; i< this.phantomContainer.length; i++) {
		var c = this.phantomContainer.getChildAt(i);
		if (!c.partImage) {
			nonNeededParts.push(c);
		}
	}

	//unsticky everything
	for (var i=0; i< this.DEBUGStickyParts.length; i++) {
		this.DEBUGStickyParts[i].stickied = false;
	}

	for (var i=0; i< nonNeededParts.length; i++) {
		this.phantomContainer.remove(nonNeededParts[i],false);
		nonNeededParts[i].inputEnabled = true;
		nonNeededParts[i].input.enableDrag();
		nonNeededParts[i].position.x = this.phantomSprite.position.x + nonNeededParts[i].position.x + 10;
		nonNeededParts[i].position.y = this.phantomSprite.position.y + nonNeededParts[i].position.y + 10;
		this.game.world.add(nonNeededParts[i]);
		
	}

	return true;
};


BodyPart.prototype.attachPart = function(otherPart) {
	var otherPartBounds = otherPart.DEBUGAnchor.getBounds();
	for (var i in this.DEBUGStickyParts) {
		var stickyBounds = this.DEBUGStickyParts[i].getBounds();
		if(Phaser.Rectangle.intersects(otherPartBounds, stickyBounds) &&
				otherPart.type == this.stickyParts[i].type){
			//can only drag from parent to child
			if (otherPart.phantomSprite.parent != this.phantomContainer
					&& !otherPart.phantomSprite.input.isDragged){
				if (this.DEBUGStickyParts[i].stickied == true) {
					continue;
				}
				if (otherPart.touchCounter<7) {
					otherPart.touchCounter++;
				}
				else {
					this.DEBUGStickyParts[i].stickied = true;
					otherPart.phantomSprite.inputEnabled = false;
					otherPart.phantomSprite.input.disableDrag();
					otherPart.phantomSprite.position.x = this.stickyParts[i].x-(this.sprite.width*this.anchorPoint.x);
					otherPart.phantomSprite.position.y = this.stickyParts[i].y-(this.sprite.height*this.anchorPoint.y);
					//this.phantomContainer.add(otherPart.phantomSprite);
					if (this.DEBUG) {
						console.log("length of container before add: "+this.phantomContainer.length);
					}
					this.phantomContainer.addChildAt(otherPart.phantomSprite, 0);
					otherPart.phantomSprite.bringToTop();
					otherPart.phantomSprite.position.x = this.stickyParts[i].x-(this.sprite.width*this.anchorPoint.x);
					otherPart.phantomSprite.position.y = this.stickyParts[i].y-(this.sprite.height*this.anchorPoint.y);
					this.rearrangeStack();

				}
				return true;
			}
		}
	}
	return false;
};


BodyPart.prototype.rearrangeStack = function() {
	if (this.DEBUG) {
		console.log("length of container after add: "+this.phantomContainer.length);
	}
	this.phantomContainer.sort('stackOrder', Phaser.Group.SORT_ASCENDING);
	if (this.DEBUG) {
		this.phantomContainer.forEach(function(child) {
			console.log("child stackOrder: "+child.stackOrder);
		}, this);
	}
};


//update all that is happening (called 60/s)
BodyPart.prototype.update = function(animStart) {
};


BodyPart.prototype.createPart = function(game) {
};
