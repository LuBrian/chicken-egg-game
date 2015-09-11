var menuState = {
	create: function() {
	// Add a background image
	game.add.image(0, 0, 'background');
	// Display the name of the game
	var nameLabel = game.add.text(game.world.centerX, 60, 'Egg',
	{ font: '70px myLcsFont', fill: 'black' });
	nameLabel.anchor.setTo(0.5, 0.5);
	
	// instruction of how to play the game
	var instruction = game.add.text(game.world.centerX,game.world.centerY,
		"Keyboard control 'C' 'D' 'N' 'J' to move the wolf",
		{ font: '25px myLcsFont', fill: 'black' })
	instruction.anchor.setTo(0.5,0.5);

	// Explain how to start the game
	var startLabel = game.add.text(game.world.centerX, game.world.height-80,
	'press the SPACEBAR key to start',
	{ font: '25px myLcsFont', fill: 'black' });
	startLabel.anchor.setTo(0.5, 0.5);
	// Create a new Phaser keyboard variable: the up arrow key
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	// When the 'spacebar' is pressed, it will call the 'start' function once
	upKey.onDown.addOnce(this.start, this);
 


	},
	start: function() {
	// Start the actual game
		game.state.start('play');
	},



};