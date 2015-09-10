var loadState = {
	preload:function() {
		game.load.image('leftWolf','assets/left_wolf.png');
		game.load.image('rightWolf','assets/right_wolf.png');		
		game.load.image('background', 'assets/game-background.jpg');
		game.load.image('LeftChicken', 'assets/chicken1.png');
		game.load.image('RightChicken', 'assets/chicken2.png');
		game.load.image('leftShelf','assets/shelf2.png');
		game.load.image('rightShelf','assets/shelf1.png');
		game.load.image('egg','assets/egg3.png');
		game.load.image('leftDownHand','assets/left_down_hand.png');
		game.load.image('rightDownHand','assets/right_down_hand.png');
		game.load.image('leftUpHand','assets/left_up_hand.png');
		game.load.image('rightUpHand','assets/right_up_hand.png');
		game.load.image('brokenEgg','assets/broken-egg.png');
		game.load.image('button','assets/button1.png');
		game.load.image('pause2','assets/pausebutton2.png');
	},
	create:function() {
		game.state.start('menu');
	}
}