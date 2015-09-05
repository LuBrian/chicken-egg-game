var playState = {
	create: function() {
		this.cursor = game.input.keyboard.createCursorKeys();
		game.add.image(0,0,'background');
		// the wolf image size is 110X115 (WxH);
		this.wolfLeftDown = game.add.sprite(269, 320,
	'wolfLeftDown');
		this.wolfLeftDown.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.wolfLeftDown);
		this.wolfRightDown = game.add.sprite(511, 320,
	'wolfRightDown');
		this.wolfRightDown.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.wolfRightDown);

		
		this.createShelves();
		
		this.createChickens();
		this.eggTopLeft = game.add.sprite(70,147,'egg');  //70,147
		// this.eggTopLeft = game.add.sprite(95,160,'egg'); 
		// this.eggTopLeft = game.add.sprite(120,173,'egg'); 
		// this.eggTopLeft = game.add.sprite(145,186,'egg'); 
		// this.eggTopLeft = game.add.sprite(175,220,'egg');


		game.physics.arcade.enable(this.eggTopLeft);

		game.time.events.loop(500, this.updateEggPosition,this);
		// this.updateEggPosition();
  	




		this.EggTime = 0;

	},

	update:function(){
		this.game.physics.arcade.collide(this.eggTopLeft, this.groundlayer);


		// if (this.EggTime < game.time.now) {
		// // Define our variables
		// // var start = 4000, end = 1000, score = 100;
		// // Formula to decrease the delay between enemies over time
		// // At first it's 4000ms, then slowly goes to 1000ms
		// var delay = Math.max(start - (start-end)*game.global.score/score, end);
		// // Create a new enemy, and update the 'nextEnemy' time
		// this.updateEggPosition();
		// this.nextEnemy = game.time.now + delay;



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


	updateEggPosition:function(){
		var eggPositionTopLeft = [
			{x: 70, y: 147}, {x: 95, y: 160},
			{x: 120, y: 173}, {x: 145, y: 186},
			{x:175, y:220}
		];

		for (var i = 0; i < eggPositionTopLeft.length; i++) {
			if (eggPositionTopLeft[i].x === this.eggTopLeft.x) {
			eggPositionTopLeft.splice(i, 1);
			};
		// var newPosition = eggPositionTopLeft[i];
		// // Set the new position of the coin
		// this.eggTopLeft.reset(newPosition.x, newPosition.y);
		}


		var newPosition = eggPositionTopLeft[
		game.rnd.integerInRange(0, eggPositionTopLeft.length-1)];
		// Set the new position of the coin
		this.eggTopLeft.reset(newPosition.x, newPosition.y);

		


	}

}