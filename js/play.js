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
			this.catchSound.play();
		}
	},

	cleanUpEggs: function(egg)
	{
		if(egg.caught)
		{
			game.global.score++;
			this.scoreLabel.text = 'Score: ' + game.global.score;
		}
		else
		{
			//Roll for cracked eggs
			if(game.rnd.integerInRange(1,6) === 1)
			{
				//Create the cracked egg sprite
				this.lives -= .5;
				this.playerLife.text = 'life: ' + Math.round(this.lives);
				if (egg.direction == 'left'){
					this.happychicken = game.add.sprite(175,400,'happychicken2');
					this.happySound.play();
					setTimeout(function(){
						this.happychicken.kill();
						this.happychicken = game.add.sprite(75,400,'happychicken4');
						this.happySound.play();
						setTimeout(function(){
							this.happychicken.kill();
						}.bind(this),500)
					}.bind(this),500)

				} else {
					this.happychicken = game.add.sprite(575,400,'happychicken1');
					this.happySound.play();
					setTimeout(function(){
						this.happychicken.kill();
						this.happychicken = game.add.sprite(700,400,'happychicken3');
						this.happySound.play();
						setTimeout(function(){
							this.happychicken.kill();
						}.bind(this),500)
					}.bind(this),500)
				}

			}
			else
			{
				this.lives -= 1;
				this.dropSound.play();
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
		this.wolf = new Wolf(game);
	},

	create: function() {
		game.add.image(0,0,'background');
		this.createShelves();
		this.createChickens();
		this.eggs = [];

		this.makeWolf();

		this.loop = setInterval(function changeState(){
			if (!this.paused) {
				this.eggs.forEach(function(egg)
				{
					egg.changeState();
				});
			}
		}.bind(this),500)

		// show pause button
		pause_label = game.add.button(720, 10, 'pausebutton',this.pause, this);

		this.scoreLabel = game.add.text(game.world.centerX,50,'Score: 0',{font: '20px myLcsFont', fill: 'black'});
		this.scoreLabel.anchor.setTo(0.5,0.5);
		game.global.score = 0;
		
		this.playerLife = game.add.text(game.world.centerX,30,'Life: 3',{font: '20px myLcsFont', fill: 'black'});
		this.playerLife.anchor.setTo(0.5,0.5);
		this.lives = 3;

		this.nextEggTime = 0;
		this.speedRoundTicks = 0;
		this.speedSound = game.add.audio('speedSound');
		this.happySound = game.add.audio('happySound');
		this.catchSound = game.add.audio('catchSound');
		this.laySound = game.add.audio('laySound');
		this.dropSound = game.add.audio('dropSound');
	},

	pause: function()
	{
		// pause the entire game
		pause_label.kill();
		this.paused = true;
		this.wolf.pause(this.paused);
		play_label = game.add.button(720, 10, 'playbutton',this.unpause, this);
	},

	unpause: function() {
		// Unpause the entire game
    this.paused = false;
    play_label.kill();
    this.wolf.pause(this.paused);
    pause_label = game.add.button(720, 10, 'pausebutton',this.pause, this);
	},

	getDelay: function()
	{
		var baseSpeed = Math.max(2 - 0.024 * game.global.score, 0.3);
		if(this.speedRoundTicks > 0)
		{
			return 1000 * baseSpeed * 0.5;
		} else {
			return 1000 * baseSpeed;
		}
	},

	update:function()
	{
		if(this.paused) { return; }
		
		if (this.speedChicken) {
			this.speedChicken.angle += 2;
		}

		if (this.nextEggTime < game.time.now)
		{
			if (game.global.score == 60 || game.global.score == 100 || game.global.score == 120){
				this.lives += 1;
				this.playerLife.text = 'Life: ' + Math.round(this.lives);
			}
			
			if(this.speedRoundTicks == 0 && game.global.score >= 10)
			{
				if(game.rnd.integerInRange(1, 25) === 6)
				{
					this.speedChicken = game.add.sprite(50,50,'speedchicken');
					this.speedChicken.anchor.setTo(0.5,0.5);
					this.speedSound.play();
					this.speedRoundTicks = game.rnd.integerInRange(10,15);

				}
			}

			var chicken = game.rnd.integerInRange(1, 4);
			this.makeEgg((chicken == 1 || chicken == 3) ? 'top' : 'bottom', chicken <= 2 ? 'left' : 'right');
			this.laySound.play();
			this.nextEggTime = game.time.now + this.getDelay();

			if(this.speedRoundTicks > 0)
			{
				this.speedRoundTicks--;
			}
			if(this.speedRoundTicks == 0)
			{
				if(this.speedChicken)
				{
					this.speedChicken.kill();
				}
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