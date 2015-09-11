var bootState = {
	create: function() {
	// Set some game settings
	game.physics.startSystem(Phaser.Physics.ACADE);
	// Start the load state
	game.state.start('load');
	}
};