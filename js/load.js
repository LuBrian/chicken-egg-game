var loadState = {
	preload:function() {
		game.load.image('wolfLeftDown','assets/wolf_left_down1.png');
		// game.load.image('wolfLeftUp', 'assets/wolf_left');
		game.load.image('wolfRightDown','assets/wolf_right_down1.png');
		game.load.image('wolfLeftUp','assets/wolf1.png');
		game.load.image('wolfRightUp','assets/wolf2.png');
		
		game.load.image('background', 'assets/game-background.jpg');
		game.load.image('LeftChicken', 'assets/chicken1.png');
		game.load.image('RightChicken', 'assets/chicken2.png');
		game.load.image('leftShelf','assets/shelf2.png');
		game.load.image('rightShelf','assets/shelf1.png');
		game.load.image('egg','assets/egg3.png');





	},
	create:function() {
		game.state.start('menu');


	}


}