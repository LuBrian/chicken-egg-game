var endState = {
	create: function(){
		game.add.image(0, 0, 'background');
		var nameLabel = game.add.text(game.world.centerX, 120, 'Game Over',
			{ font: '80px Arial', fill: 'black' });
		nameLabel.anchor.setTo(0.5, 0.5);

		if (!localStorage.getItem('bestScore')) {
		// Then set the best score to 0
		localStorage.setItem('bestScore', 0);
		}
		// If the score is higher than the best score
		if (game.global.score > localStorage.getItem('bestScore')) {
			// Then update the best score
			localStorage.setItem('bestScore', game.global.score);
		}

		var text = 'score: ' + game.global.score + '\nbest score: ' +
		localStorage.getItem('bestScore');
		var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text,
		{ font: '25px Arial', fill: 'black', align: 'center' });
		scoreLabel.anchor.setTo(0.5, 0.5);

 	
		var button = game.add.button(game.world.centerX,320,'button',this.showMenu,this);
		button.anchor.setTo(0.5,0.5);
		console.log(button);

	},
	showMenu: function(){
		this.game.state.start('menu');
	}
}
