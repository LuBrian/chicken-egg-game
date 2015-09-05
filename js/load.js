var loadState = {
	preload:function() {
		game.load.image('wolfLeftDown','assets/wolf_left_down1.png');
		// game.load.image('wolfLeftUp', 'assets/wolf_left');
		game.load.image('wolfRightDown','assets/wolf_right_down1.png');
		

		// game.load.image('tileset00','assets/tile_00.png');
		// game.load.image('tileset24','assets/tile_24.png');
		// // game.load.tilemap('tileShelf','shelf.json',null,Phaser.Tilemap.TILED_JSON);
		// game.load.image('wolfRightUp')
		// game.load.image('horizontalShelf','assets/Shelf.png');
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