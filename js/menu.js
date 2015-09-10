var menuState = {
	create: function() {
	// Add a background image
	game.add.image(0, 0, 'background');
	// Display the name of the game
	var nameLabel = game.add.text(game.world.centerX, 80, 'Egg',
	{ font: '50px Arial', fill: 'black' });
	nameLabel.anchor.setTo(0.5, 0.5);
	

	// Explain how to start the game
	var startLabel = game.add.text(game.world.centerX, game.world.height-80,
	'press the space key to start',
	{ font: '25px Arial', fill: 'black' });
	startLabel.anchor.setTo(0.5, 0.5);
	// Create a new Phaser keyboard variable: the up arrow key
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	// When the 'upKey' is pressed, it will call the 'start' function once
	upKey.onDown.addOnce(this.start, this);
 
	// 	// Add the mute button that calls the 'toggleSound' function when pressed
	// this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
	// // If the mouse is over the button, it becomes a hand cursor
	// this.muteButton.input.useHandCursor = true;	
	// // If the game is already muted
	// if (game.sound.mute) {
	// // Change the frame to display the speaker with no sound
	// this.muteButton.frame = 1;
	// }


	},
	start: function() {
	// Start the actual game
		game.state.start('play');
	},

	// Function called when the 'muteButton' is pressed
	// toggleSound: function() {
	// // Switch the Phaser sound variable from true to false, or false to true
	// // When 'game.sound.mute = true', Phaser will mute the game
	// game.sound.mute = ! game.sound.mute;
	// // Change the frame of the button
	// this.muteButton.frame = game.sound.mute ? 1 : 0;
	// },


};