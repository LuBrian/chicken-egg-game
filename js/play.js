var playState = {
	makeEgg: function(shelf, direction)
	{
		var egg = new Egg(game, shelf, direction, this.checkCollision);
		game.add.existing(egg);
		this.eggs.push(egg);
		egg.events.onKilled.add(this.cleanUpEggs, this);
	},

	checkCollision: function(egg)
	{
		// check if the egg and the shelf has the same direction and shelf
		if (wolf.shelf == egg.shelf && wolf.direction == egg.direction){
			egg.caught = true;
		}
	},

	cleanUpEggs: function(egg)
	{
		if(egg.caught)
		{
			game.global.score++;
			this.scoreLabel.text = 'score: ' + game.global.score;
		}
		else
		{
			//Roll for cracked eggs
			if(game.rnd.integerInRange(1,6) === 6)
			{
				//Create the cracked egg sprite
				this.lives -= .5;
				this.playerLife.text = 'life: ' + Math.round(this.lives);
				if (egg.direction == 'left'){
					this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),1000)
				} else {
					this.brokenEgg = game.add.sprite(575,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),1000)
				}

			}
			else
			{
				this.lives -= 1;
				this.playerLife.text = 'life: ' + Math.round(this.lives);
				if (egg.direction == 'left'){
					this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),1000)
				} else {
					this.brokenEgg = game.add.sprite(575,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),1000)
				}
			}
			if(this.lives <= 0)
			{
				//Change state to "Game Over"
				clearInterval(this.loop);
				game.state.start('gameOver');


			}
		}
		this.eggs = this.eggs.filter(function(ee)
		{
			return egg != ee;
		});
	},

	makeWolf: function()
	{
		wolf = new Wolf(game);
	},

	create: function() {
		game.add.image(0,0,'background');
		this.createShelves();
		this.createChickens();
		this.eggs = [];


		isPaused = false;
		this.loop = setInterval(function changeState()
		{ 
			if(!isPaused) {
				this.eggs.forEach(function(egg)
				{
					egg.changeState();
				});
			}
		}.bind(this), 500);

		this.makeWolf();







		pause_label = game.add.text(680, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;
        // clearInterval(this.loop);
        isPaused = true;

        // Then add the menu
        this.pauseMenu = game.add.text(game.world.centerX,game.world.centerY,'Press space to continue, press q to quit',{ font: '24px Arial', fill: 'red' });
				this.pauseMenu.anchor.setTo(0.5,0.5);

    }.bind(this));
    // if (isPaused){
	    var resumeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    resumeKey.onDown.add(this.unpause,this);

	    var quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	    quitKey.onDown.add(this.quit,this);
  	

    // And finally the method that handels the pause menu
    // function unpause() {
    // 	resumeButton.destroy();
    // 	restartButton.destroy();
    //   game.paused = false;
    //   this.loop;
    // };

    // function restart(){

    // };






		this.scoreLabel = game.add.text(30,30,'score: 0',{font: '18px Arial', fill: 'black'});
		game.global.score = 0;
		
		this.playerLife = game.add.text(700,30,'Life: 3',{font: '18px Arial', fill: 'black'});
		this.lives = 3;

		this.nextEggTime = 0;
	},

	unpause: function(){
		this.pauseMenu.destroy();
  	isPaused = false;
    game.paused = false;
	},

	quit: function(){
		this.pauseMenu.destroy();
		isPaused = false;
    game.paused = false;
		clearInterval(this.loop);
		game.state.start('menu');

	},

	update:function() {
		if (this.nextEggTime < game.time.now) {
		// when score is 57, reach max speed
		challenge = Math.max(1.5 - 0.024 * game.global.score, 0.3);
		// this.challenge = ;
		var delay = 1000 * challenge;

		// Create a new egg, and update the 'nextEgg' time
		this.chicken = game.rnd.integerInRange(1, 4);
		this.makeEgg((this.chicken == 1 || this.chicken == 3) ? 'top' : 'bottom', this.chicken <= 2 ? 'left' : 'right');
		this.nextEggTime = game.time.now + delay;
		};

	},




	createChickens: function(){
		this.chickens = game.add.group();
		game.add.sprite(3,106,'LeftChicken',0,this.chickens); //this.chickenLeftTop
		game.add.sprite(3,216,'LeftChicken',0,this.chickens); //this.chickenLeftBot
		game.add.sprite(710,106,'RightChicken',0,this.chickens); //this.chickenRightTop
		game.add.sprite(710,216,'RightChicken',0,this.chickens); //this.chickenRightTop
	},



	createShelves:function(){
		this.shelves = game.add.group();
		game.add.sprite(0,140,'leftShelf',0,this.shelves); //left top
		game.add.sprite(0,250,'leftShelf',0,this.shelves); //left bot
		game.add.sprite(610,140,'rightShelf',0,this.shelves); //right top
		game.add.sprite(610,250,'rightShelf',0,this.shelves); //right bot
	},

}