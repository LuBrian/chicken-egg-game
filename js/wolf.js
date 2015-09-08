Wolf.prototype = Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor = Wolf;


var Egg = function Egg(game, shelf, direction, checkCollisions)
{
	var WolfPositions = {
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

	var handsPosition