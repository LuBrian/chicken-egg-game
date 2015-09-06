var playState = {
	create: function() {
		this.cursor = game.input.keyboard.createCursorKeys();
		game.add.image(0,0,'background');

		this.wolf = game.add.sprite(269, 320,'wolfLeftDown');
		this.wolf.anchor.setTo(0.5, 0.5);
		// game.physics.arcade.enable(this.wolfLeftDown);
		// this.wolfRightDown = game.add.sprite(511, 320,'wolfRightDown');
		// this.wolfRightDown.anchor.setTo(0.5, 0.5);
		// game.physics.arcade.enable(this.wolfRightDown);

		// this.wolfLeftUp = game.add.sprite(269,320,'wolfLeftUp');
		// this.wolfLeftUp.anchor.setTo(0.5,0.5);
		// this.wolfRightUp = game.add.sprite(511,320,'wolfRightUp');
		// this.wolfRightUp.anchor.setTo(0.5,0.5);

		
		this.createShelves();
		
		this.createChickens();


		var catchLeftDown = game.input.keyboard.addKey(Phaser.Keyboard.V);
		catchLeftDown.onDown.add(this.catchLeftDown, this);

		var catchRightDown = game.input.keyboard.addKey(Phaser.Keyboard.N);
		// When the 'upKey' is pressed, it will call the 'start' function once
		catchRightDown.onDown.add(this.catchRightDown, this);

		var catchLeftUp = game.input.keyboard.addKey(Phaser.Keyboard.E);
		// When the 'upKey' is pressed, it will call the 'start' function once
		catchLeftUp.onDown.add(this.catchLeftUp, this);

		var catchRightUp = game.input.keyboard.addKey(Phaser.Keyboard.I);
		// When the 'upKey' is pressed, it will call the 'start' function once
		catchRightUp.onDown.add(this.catchRightUp, this);

		// game.physics.arcade.enable(this.eggTopLeft);

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
		this.wolf = game.add.sprite(269, 320,'wolfLeftDown');
		this.wolf.anchor.setTo(0.5, 0.5);
	},
	catchRightDown: function(){
		this.wolf.kill();
		this.wolf = game.add.sprite(511, 320,'wolfRightDown');
		this.wolf.anchor.setTo(0.5, 0.5);
	},
	catchLeftUp: function(){
		this.wolf.kill();
		this.wolf = game.add.sprite(269,320,'wolfLeftUp');
		this.wolf.anchor.setTo(0.5,0.5);
	},
	catchRightUp: function(){
		this.wolf.kill();
		this.wolf = game.add.sprite(511,320,'wolfRightUp');
		this.wolf.anchor.setTo(0.5,0.5);
	},

	update:function(){

		if (this.nextEggTime < game.time.now) {
		
		var challenge = 2;
		var delay = 1000 * challenge;

		// Create a new egg, and update the 'nextEgg' time
		this.chicken = chickenArray[game.rnd.integerInRange(0, chickenArray.length-1)];

		if (this.chicken == 1 ){
			this.eggTopLeft = game.add.sprite(70,147,'egg');
			this.topLeftEggDropLoop = game.time.events.loop(500 * challenge, this.updateTopLeftEggPosition,this);

			var chickenIndex = chickenArray.indexOf(1);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(1);
			},2500 * challenge);
		};
		if (this.chicken == 2) {
			this.eggDownLeft = game.add.sprite(70,257,'egg');
			this.downLeftEggDropLoop = game.time.events.loop(500 * challenge, this.updateDownLeftEggPosition,this);

			var chickenIndex = chickenArray.indexOf(2);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(2);
			},2500 * challenge);
		};

		if (this.chicken == 3) {
			this.eggTopRight = game.add.sprite(680,147,'egg');
			this.topRightEggDropLoop = game.time.events.loop(500 * challenge, this.updateTopRightEggPosition,this);

			var chickenIndex = chickenArray.indexOf(3);
			chickenArray.splice(chickenIndex,1);

			setTimeout(function(){
				chickenArray.push(3);
			},2500 * challenge);
		};

		if (this.chicken == 4) {
			this.eggDownRight = game.add.sprite(680,257,'egg');
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



	updateTopLeftEggPosition:function(){
		
 		// this piece is for infinite loop: 
		// console.log(playState.topLeftEggPosition);
		// if (this.topLeftEggPosition > this.maxNum) {
		// 	this.topLeftEggPosition = 0;
		// };

		
		if (this.topLeftEggPosition >= this.maxNum) {
			this.eggTopLeft.kill();
			this.topLeftEggPosition = 0;
			game.time.events.remove(this.topLeftEggDropLoop);
			// this.eggTopLeft.kill();
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

 		// this piece is for infinite loop: 
		// console.log(playState.downLeftEggPosition);
		// if (this.downLeftEggPosition > this.maxNum) {
		// 	this.downLeftEggPosition = 0;
		// };

		// this piece is for one loop when it is called
		if (this.downLeftEggPosition >= this.maxNum) {
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
		// this piece is for infinite loop: 
		// console.log(playState.topRightEggPosition);
		// if (this.topRightEggPosition > this.maxNum) {
		// 	this.topRightEggPosition = 0;
		// };
		

		// this piece is for one loop when it is called
		if (this.topRightEggPosition >= this.maxNum) {
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
		}
	},


	updateDownRightEggPosition:function(){
		// this piece is for infinite loop: 
		// console.log(playState.downRightEggPosition);
		// if (this.downRightEggPosition > this.maxNum) {
		// 	this.downRightEggPosition = 0;
		// };

		// this piece is for one loop when it is called
		if (this.downRightEggPosition >= this.maxNum) {
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