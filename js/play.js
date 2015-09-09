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
		//egg.direction
		//where is hand? if hand is same side as egg and same shelf as egg - caught
		// console.log('Checking collision for %s %s', egg.shelf, egg.direction);
		// console.log(wolf.shelf + wolf.direction);
		if (wolf.shelf == egg.shelf && wolf.direction == egg.direction){
			console.log('caught')
			egg.caught = true;
		} else {
			console.log('miss')
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
				this.playerLife.text = 'life: ' + this.lives;
				if (egg.direction == 'left'){
					this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),500)
				} else {
					this.brokenEgg = game.add.sprite(575,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),500)
				}

			}
			else
			{
				this.lives -= 1;
				this.playerLife.text = 'life: ' + this.lives;
				if (egg.direction == 'left'){
					this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),500)
				} else {
					this.brokenEgg = game.add.sprite(575,400,'brokenEgg');
					setTimeout(function(){
						this.brokenEgg.kill();
					}.bind(this),500)
				}
			}
			if(this.lives <= 0)
			{
				//Change state to "Game Over"
				// console.log(this.loop);
				clearInterval(this.loop);
				game.state.start('menu');


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



		this.loop = setInterval(function changeState()
		{
			console.log('test');
			this.eggs.forEach(function(egg)
			{
				egg.changeState();
			});
		}.bind(this), 500);

		this.makeWolf();


		this.scoreLabel = game.add.text(30,30,'score: 0',{font: '18px Arial', fill: 'black'});
		game.global.score = 0;
		
		this.playerLife = game.add.text(700,30,'Life: 3',{font: '18px Arial', fill: 'black'});
		this.lives = 3;

		this.nextEggTime = 0;
	},



	update:function() {
		if (this.nextEggTime < game.time.now) {
		// when score is 50, reach max speed
		this.challenge = Math.max(2 - 0.03*game.global.score, 0.3);
		// this.challenge = ;
		var delay = 1000 * this.challenge;

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