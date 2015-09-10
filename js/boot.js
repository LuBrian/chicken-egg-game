var bootState = {
	preload: function () {
	// Load the image
	// game.load.image('progressBar', 'assets/progressBar.png');
	},
	create: function() {
	// Set some game settings


	game.physics.startSystem(Phaser.Physics.ACADE);
	// Start the load state
	game.state.start('load');
	}
};