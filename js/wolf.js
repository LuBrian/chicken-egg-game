var Wolf = function Wolf(game, shelf, direction)
{
	if ( shelf == 'top' && direction == 'left'){
		Phaser.Sprite.call(this, game,160,220,'leftUpHand',0);
		Phaser.Sprite.call(this, game, 295,310,'leftWolf',0 );
	}
	if (shelf == 'bottom' && direction == 'left') {
		Phaser.Sprite.call(this, game,175, 325,'leftDownHand',0);
		Phaser.Sprite.call(this, game, 295, 310,'leftWolf',0);
	}
	if (shelf == 'top' && direction == 'right'){
		Phaser.Sprite.call(this, game,518,220,'rightUpHand',0);	
		Phaser.Sprite.call(this, game, 485, 310,'rightWolf',0);
	}
	if (shelf == 'bottom' && direction == 'right'){
		Phaser.Sprite.call(this, game,503,325,'rightDownHand',0);
		Phaser.Sprite.call(this, game, 485, 310,'rightWolf',0);
	}

	// this.game = game;
	// this.state = 0;
	// this.shelf = shelf;
	// this.direction = direction;
	// this.checkCollisions = checkCollisions;
	// this.caught = false;

},

Wolf.prototype = Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor = Wolf;