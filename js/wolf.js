var Wolf = function Wolf(game)
{
	//Ok, so you need to set up the wolf in the initial position
	Phaser.Sprite.call(this, game);
	this.wolf = game.add.sprite(295, 310,'leftWolf');
	this.wolf.anchor.setTo(0.5, 0.5);
	this.hand = game.add.sprite(175, 325,'leftDownHand');
	this.direction = 'left';
	this.shelf = 'bottom';
	this.game = game;
	game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(this.changeState('left','down'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(this.changeState('right','down'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.changeState('left','up'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.J).onDown.add(this.changeState('right','up'), this);
};

Wolf.prototype = Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor = Wolf;

Wolf.prototype.pause = function(paused)
{
	this.paused = paused;
}

Wolf.prototype.changeState = function(direction, shelf)
{
	return function(e)
	{
		if(this.paused) { return; }
		if(direction == 'left')
		{
			//Draw Left wolf
			this.wolf.kill();
			this.hand.kill();
			this.wolf = game.add.sprite(295, 310,'leftWolf');
			this.wolf.anchor.setTo(0.5, 0.5);
			this.direction = 'left'
			if(shelf == 'up')
			{
				//draw top-left hand
				this.hand = game.add.sprite(160,220,'leftUpHand');
				this.shelf = 'top';
			}
			else
			{
				//Draw bottom-left hand
				this.hand = game.add.sprite(175, 325,'leftDownHand');
				this.shelf = 'bottom';

			}
		}
		else
		{
			//Draw right wolf
			this.wolf.kill();
			this.hand.kill();
			this.wolf = game.add.sprite(485, 310,'rightWolf');
			this.wolf.anchor.setTo(0.5, 0.5);
			this.direction = 'right';
			if(shelf == 'up')
			{
				//draw top-right hand
				this.hand = game.add.sprite(518,220,'rightUpHand');
				this.shelf = 'top';
			}
			else
			{
				//Draw bottom-right hand
				this.hand = game.add.sprite(503,325,'rightDownHand');
				this.shelf = 'bottom';
			}	
		}
	}
}