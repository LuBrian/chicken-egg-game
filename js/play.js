var playState = {
	create: function() {
		game.add.image(0,0,'background');
		this.scoreLabel = game.add.text(30,30,'score: 0',{font: '18px Arial', fill: 'black'});
		this.score = 0;
		
		this.playerLife = game.add.text(700,30,'Life: 3',{font: '18px Arial', fill: 'black'});
		this.life = 3;

		//initial image when start the game
		this.wolf = game.add.sprite(295, 310,'leftWolf');
		this.wolf.anchor.setTo(0.5, 0.5);
		this.hand = game.add.sprite(175, 325,'leftDownHand');
		game.physics.arcade.enable(this.hand);

		// this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
		
		this.createShelves();
		this.createChickens();

		//calling the move function for each hand
		var catchLeftDown = game.input.keyboard.addKey(Phaser.Keyboard.C);
		//when the "C" is pressed, it will call catchLeftDown function
		catchLeftDown.onDown.add(this.catchLeftDown, this);

		var catchRightDown = game.input.keyboard.addKey(Phaser.Keyboard.N);
		//when the "N" is pressed, it will call catchRightDown function
		catchRightDown.onDown.add(this.catchRightDown, this);

		var catchLeftUp = game.input.keyboard.addKey(Phaser.Keyboard.S);
		//when the "S" is pressed, it will call catchLeftUp function
		catchLeftUp.onDown.add(this.catchLeftUp, this);

		var catchRightUp = game.input.keyboard.addKey(Phaser.Keyboard.K);
		//when the "K" is pressed, it will call catchRightUp function
		catchRightUp.onDown.add(this.catchRightUp, this);

		// initialization for each egg
		this.topLeftEggPosition = 0;
		this.downLeftEggPosition = 0;
		this.topRightEggPosition = 0;
		this.downRightEggPosition = 0;
		this.maxNum = 4;

		this.nextEggTime = 0;
		chickenArray = [1,2,3,4];
	},

	catchLeftDown: function(){
		this.wolf.kill();
		this.hand.kill();
		this.wolf = game.add.sprite(295, 310,'leftWolf');
		this.wolf.anchor.setTo(0.5, 0.5);
		this.hand = game.add.sprite(175, 325,'leftDownHand');
		game.physics.arcade.enable(this.hand);
	},
	catchRightDown: function(){
		this.wolf.kill();
		this.hand.kill();
		this.wolf = game.add.sprite(485, 310,'rightWolf');
		this.wolf.anchor.setTo(0.5, 0.5);
		this.hand = game.add.sprite(503,325,'rightDownHand');
		game.physics.arcade.enable(this.hand);
	},
	catchLeftUp: function(){
		this.wolf.kill();
		this.hand.kill();
		this.wolf = game.add.sprite(295, 310,'leftWolf');
		this.wolf.anchor.setTo(0.5, 0.5);
		this.hand = game.add.sprite(160,220,'leftUpHand');
		game.physics.arcade.enable(this.hand);
	},
	catchRightUp: function(){
		this.wolf.kill();
		this.hand.kill();
		this.wolf = game.add.sprite(485, 310,'rightWolf');
		this.wolf.anchor.setTo(0.5, 0.5);
		this.hand = game.add.sprite(518,220,'rightUpHand');	
		game.physics.arcade.enable(this.hand);	
	},

	update:function(){
		game.physics.arcade.overlap(this.hand, this.eggTopLeft, this.addTopLeftScore,null,this);
		game.physics.arcade.overlap(this.hand, this.eggDownLeft, this.addDownLeftScore,null,this);
		game.physics.arcade.overlap(this.hand, this.eggTopRight, this.addTopRightScore,null,this);
		game.physics.arcade.overlap(this.hand, this.eggDownRight, this.addDownRightScore,null,this);



		if (this.nextEggTime < game.time.now) {
		
		var challenge = 3;
		var delay = 1000 * challenge;

		// Create a new egg, and update the 'nextEgg' time
		this.chicken = chickenArray[game.rnd.integerInRange(0, chickenArray.length-1)];

		if (this.chicken == 1 ){
			this.eggTopLeft = game.add.sprite(70,147,'egg');
			game.physics.arcade.enable(this.eggTopLeft);
			this.topLeftEggDropLoop = game.time.events.loop(500 * challenge, this.updateTopLeftEggPosition,this);

			var chickenIndex = chickenArray.indexOf(1);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(1);
			},2500 * challenge);
		};
		if (this.chicken == 2) {
			this.eggDownLeft = game.add.sprite(70,257,'egg');
			game.physics.arcade.enable(this.eggDownLeft);
			this.downLeftEggDropLoop = game.time.events.loop(500 * challenge, this.updateDownLeftEggPosition,this);

			var chickenIndex = chickenArray.indexOf(2);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(2);
			},2500 * challenge);
		};

		if (this.chicken == 3) {
			this.eggTopRight = game.add.sprite(680,147,'egg');
			game.physics.arcade.enable(this.eggTopRight);
			this.topRightEggDropLoop = game.time.events.loop(500 * challenge, this.updateTopRightEggPosition,this);

			var chickenIndex = chickenArray.indexOf(3);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(3);
			},2500 * challenge);
		};

		if (this.chicken == 4) {
			this.eggDownRight = game.add.sprite(680,257,'egg');
			game.physics.arcade.enable(this.eggDownRight);
			this.downRightEggDropLoop = game.time.events.loop(500 * challenge, this.updateDownRightEggPosition,this);

			var chickenIndex = chickenArray.indexOf(4);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(4);
			},2500 * challenge);
		};


		this.nextEggTime = game.time.now + delay;
		};

	},

	addTopLeftScore:function(){
		this.eggTopLeft.kill();
		this.score += 5;
		this.scoreLabel.text = 'score: ' + this.score;
	},

	addDownLeftScore:function(){
		this.eggDownLeft.kill();
		this.score += 5;
		this.scoreLabel.text = 'score: ' + this.score;
	},

	addTopRightScore:function(){
		this.eggTopRight.kill();
		this.score += 5;
		this.scoreLabel.text = 'score: ' + this.score;
	},

	addDownRightScore:function(){
		this.eggDownRight.kill();
		this.score += 5;
		this.scoreLabel.text = 'score: ' + this.score;
	},




	createChickens: function(){
		this.chickens = game.add.group();
		this.chickens.enableBody = true;
		game.add.sprite(3,106,'LeftChicken',0,this.chickens); //this.chickenLeftTop
		game.add.sprite(3,216,'LeftChicken',0,this.chickens); //this.chickenLeftBot
		game.add.sprite(710,106,'RightChicken',0,this.chickens); //this.chickenRightTop
		game.add.sprite(710,216,'RightChicken',0,this.chickens); //this.chickenRightTop
		this.chickens.setAll('body.immovable',true);
	},



	createShelves:function(){
		this.shelves = game.add.group();
		this.shelves.enableBody = true;

		game.add.sprite(0,140,'leftShelf',0,this.shelves); //left top
		game.add.sprite(0,250,'leftShelf',0,this.shelves); //left bot
		game.add.sprite(610,140,'rightShelf',0,this.shelves); //right top
		game.add.sprite(610,250,'rightShelf',0,this.shelves); //right bot
		this.shelves.setAll('body.immovable', true);
	},

	destroyEgg: function()
	{
		// console.log(this);
		this.brokenEgg.kill();
		// console.log('kill egg');
	},

	updateTopLeftEggPosition:function(){	
		if (this.topLeftEggPosition >= this.maxNum) {
			this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
			setTimeout(this.destroyEgg.bind(this), 500);

			this.eggTopLeft.kill();
			this.topLeftEggPosition = 0;
			game.time.events.remove(this.topLeftEggDropLoop);
		} else {
				this.topLeftEggPosition += 1;
				var eggPositionTopLeft = [
				{x: 70, y: 147}, {x: 95, y: 160},
				{x: 120, y: 173}, {x: 145, y: 186},
				{x:175, y:220}
			];

			this.eggTopLeft.reset(eggPositionTopLeft[this.topLeftEggPosition].x, eggPositionTopLeft[this.topLeftEggPosition].y);
		};

	},


	updateDownLeftEggPosition:function(){
		if (this.downLeftEggPosition >= this.maxNum) {
			this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
			setTimeout(this.destroyEgg.bind(this), 500);

			this.eggDownLeft.kill();
			this.downLeftEggPosition = 0;
			game.time.events.remove(this.downLeftEggDropLoop);
		} else {
			this.downLeftEggPosition += 1;
			var eggPositionDownLeft = [
			{x: 70, y: 257}, {x: 95, y: 270},
			{x: 120, y: 283}, {x: 145, y: 296},
			{x:175, y:330}
			];
			this.eggDownLeft.reset(eggPositionDownLeft[this.downLeftEggPosition].x, eggPositionDownLeft[this.downLeftEggPosition].y);
		}
	},

	updateTopRightEggPosition:function(){
		if (this.topRightEggPosition >= this.maxNum) {
			console.log(this.eggTopRight);
			this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
			setTimeout(this.destroyEgg.bind(this), 500);
		
			this.eggTopRight.kill();
			this.topRightEggPosition = 0;
			game.time.events.remove(this.topRightEggDropLoop);
		} else {
			this.topRightEggPosition += 1;
			var eggPositionTopRight = [
				{x: 680, y: 147}, {x: 655, y: 160},
				{x: 630, y: 173}, {x: 605, y: 186},
				{x:575, y:220}
			];
			this.eggTopRight.reset(eggPositionTopRight[this.topRightEggPosition].x, eggPositionTopRight[this.topRightEggPosition].y);
			// console.log(this.eggTopRight.world.x);
		}
	},


	updateDownRightEggPosition:function(){
		if (this.downRightEggPosition >= this.maxNum) {
			this.brokenEgg = game.add.sprite(175,400,'brokenEgg');
			setTimeout(this.destroyEgg.bind(this), 500);

			this.eggDownRight.kill();
			this.downRightEggPosition = 0;
			game.time.events.remove(this.downRightEggDropLoop);
		} else {
			this.downRightEggPosition += 1;
				var eggPositionDownRight = [
				{x: 680, y: 257}, {x: 655, y: 270},
				{x: 630, y: 283}, {x: 605, y: 296},
				{x:575, y:330}
			];
		this.eggDownRight.reset(eggPositionDownRight[this.downRightEggPosition].x, eggPositionDownRight[this.downRightEggPosition].y);
		}
	}

}