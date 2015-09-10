var Egg = function Egg(game, shelf, direction, checkCollisions)
{
	var positions = {
		top: {
			left: {
				x: 90,
				y: 164
			},
			right: {
				x: 690,
				y: 164
			}
		},
		bottom:
		{
			left: {
				x: 90,
				y: 274
			},
			right: {
				x: 690,
				y: 274				
			}
		}
	};

	var pos = positions[shelf][direction];
	Phaser.Sprite.call(this, game, pos.x, pos.y, "egg", 0);
	this.anchor.setTo(0.5,0.5);
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
			this.y += 11;
			this.angle += 30;
		} 
	if (this.direction == 'right')
	{
			this.x -= 20;
			this.y += 11;
			this.angle -= 30;
	}
}

