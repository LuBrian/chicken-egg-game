var Wolf = function Wolf(game)
{
	//Ok, so you need to set up the wolf in the initial position
	// var pos = positions[shelf][direction];
	Phaser.Sprite.call(this, game, 175,325, "leftDownHand", 0);
	Phaser.Sprite.call(this, game,295,310,'leftWolf',0);
	this.game = game;
	game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(this.changeState('left','down'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(this.changeState('right','down'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.changeState('left','up'), this);
	game.input.keyboard.addKey(Phaser.Keyboard.K).onDown.add(this.changeState('right','up'), this);
};

Wolf.prototype = Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor = Wolf;
Wolf.prototype.changeState = function(direction, shelf)
{
	return function(e)
	{
		if(direction == 'left')
		{
			//Draw Left wolf
			Phaser.Sprite.call(this, game,295,310,'leftWolf',0)
			// game.add.sprite(295, 310,'leftWolf');
			if(shelf == 'top')
			{
				//draw top-left hand
				Phaser.Sprite.call(this, game,160,220,'leftUpHand',0);
				// game.add.sprite(160,220,'leftUpHand');
			}
			else
			{
				//Draw bottom-left hand
				Phaser.Sprite.call(this, game,175,325, "leftDownHand", 0);
				// game.add.sprite(175, 325,'leftDownHand');

			}
		}
		else
		{
			//Draw right wolf
			Phaser.Sprite.call(this, game,485, 310,'rightWolf',0);
			// game.add.sprite(485, 310,'rightWolf');

			if(shelf == 'top')
			{
				//draw top-right hand
				Phaser.Sprite.call(this, game,518,220,'rightUpHand', 0);
				// game.add.sprite(518,220,'rightUpHand');	
			}
			else
			{
				//Draw bottom-right hand
				Phaser.Sprite.call(this, game,503,325,'rightDownHand', 0);
				// game.add.sprite(503,325,'rightDownHand');
			}	
		}
	}
}
// Add Comment