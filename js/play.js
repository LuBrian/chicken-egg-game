var playState = {
	makeEgg: function(shelf, direction)
	{
		var egg = new Egg(game, shelf, direction, this.checkCollision.bind(this));
		game.add.existing(egg);
		this.eggs.push(egg);
		egg.events.onKilled.add(this.cleanUpEggs, this);
	},

	checkCollision: function(egg)
	{
		// check if the egg and the shelf has the same direction and shelf
		if (this.wolf.shelf == egg.shelf && this.wolf.direction == egg.direction)
		{
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
				// clearInterval(this.loop);
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
		this.wolf = new Wolf(game);
	},

	create: function() {
		game.add.image(0,0,'background');
		this.createShelves();
		this.createChickens();
		this.eggs = [];

		this.makeWolf();

		// show pause button
		pause_label = game.add.button(700, 10, 'pause2',this.pause, this);

		this.scoreLabel = game.add.text(game.world.centerX,50,'score: 0',{font: '18px Arial', fill: 'black'});
		this.scoreLabel.anchor.setTo(0.5,0.5);
		game.global.score = 0;
		
		this.playerLife = game.add.text(game.world.centerX,30,'Life: 3',{font: '18px Arial', fill: 'black'});
		this.playerLife.anchor.setTo(0.5,0.5);
		this.lives = 3;

		this.nextEggTime = 0;
	},

	pause: function()
	{
		// Pause the entire game
		this.paused = !this.paused;
		this.wolf.pause(this.paused);

    // Then show the quit and resume instructions
	  // this.pauseMenu = game.add.text(game.world.centerX,150,"Press SPACEBAR to continue \nPress Q to quit",{ font: '24px Arial', fill: 'red' });
		// this.pauseMenu.anchor.setTo(0.5,0.5);

		// Add resume key
		// var resumeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// resumeKey.onDown.add(this.unpause,this);

	  // Add quit key
	  // var quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	  // quitKey.onDown.add(this.quit,this);

	},

	unpause: function() {
		// Unpause the entire game
		// this.pauseMenu.destroy();
    this.paused = false;
	},

	quit: function() {
		// Quit the game, clean up the window and change to beginning state
		// this.pauseMenu.destroy();
    this.paused = false;
		// clearInterval(this.loop);
		game.state.start('menu');

	},

	getDelay: function()
	{
		var baseSpeed = Math.max(2 - 0.024 * game.global.score, 0.3);
		if(this.speedRoundTicks > 0)
		{
			baseSpeed * 1.02;
		}
		return 1000 * baseSpeed;
	},

	update:function()
	{
		if(this.paused) { return; }

		if (this.nextEggTime < game.time.now)
		{
			if(game.rnd.integerInRange(1, 100) === 1)
			{
				console.log('Start Speed Round')
				this.speedRoundTicks = game.rnd.integerInRange(10,15);
			}

			var chicken = game.rnd.integerInRange(1, 4);
			this.makeEgg((chicken == 1 || chicken == 3) ? 'top' : 'bottom', chicken <= 2 ? 'left' : 'right');
			this.nextEggTime = game.time.now + this.getDelay();

			this.eggs.forEach(function(egg)
			{
				egg.changeState();
			});

			if(this.speedRoundTicks > 0)
			{
				this.speedRoundTicks--;
			}
			if(this.speedRoundTicks == 0)
			{
				console.log('Stop Speed Round');
			}
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