var Egg = function Egg(game, shelf, direction, checkCollisions)
{
	var positions = {
		top: {
			left: {
				x: 70,
				y: 147
			},
			right: {
				x: 680,
				y: 147
			}
		},
		bottom:
		{
			left: {
				x: 70,
				y: 257
			},
			right: {
				x: 680,
				y: 257				
			}
		}
	};

	var pos = positions[shelf][direction];
	Phaser.Sprite.call(this, game, pos.x, pos.y, "egg", 0);
	this.game = game;
	this.state = 0;
	this.shelf = shelf;
	this.direction = direction;
	this.checkCollisions = checkCollisions;
	this.caught = false;
};

Egg.prototype = Object.create(Phaser.Sprite.prototype);
Egg.prototype.constructor = Egg;

Egg.prototype.changeState = function()
{
	// console.log('Changing state inside egg');
	this.state++;
	if(this.state >= 6)
	{
		//Check for collision
		if(!this.checkCollisions(this))
		{
			this.kill();
		}
	}
	if (this.direction == 'left')
	{
			this.x += 20;
			this.y += 10;

		} 
	if (this.direction == 'right')
	{
			this.x -= 20;
			this.y += 10;
	}
}

// Egg.prototype = {
// 	nextState: function()
// 	{
// 		
// 	}
// };

