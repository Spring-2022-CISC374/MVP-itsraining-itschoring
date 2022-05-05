class livingRoom extends Phaser.Scene{
  constructor(){
      super("livingRoom");
  }

  init(data){
      this.lastPosX = data.posX;
      this.lastPosY = data.posY;
  }

  preload(){}
  
  create(){
      var background = this.add.image(0, 0, "livingRoomBG");
      background.scale = 1.52;
      background.setOrigin(0, 0);

      this.walls = this.physics.add.group();
      var counter = this.physics.add.image(0, 0, "counter");
      var sinkFridge = this.physics.add.image(0, 0, "sinkFridge");
      var leftWall = this.physics.add.image(0, 0, "leftWall");
      var right = this.physics.add.image(0, 0, "right");
      var bottom = this.physics.add.image(0, 0, "bottom");
      var table = this.physics.add.image(0, 0, "table");
      var couchBarrier = this.physics.add.image(0, 0, "couchBarrier");
      var chairBarrierR = this.physics.add.image(0, 0, "chairBarrier");
      var chairBarrierL = this.physics.add.image(0, 0, "chairBarrier");
      //this.walls.add(counter);
      this.walls.add(sinkFridge);
      this.walls.add(leftWall);
      //this.walls.add(right);
      this.walls.add(bottom);
      this.walls.add(couchBarrier);
      this.walls.add(chairBarrierR);
      this.walls.add(chairBarrierL);
      //this.walls.add(table);
      counter.setImmovable(true);
      sinkFridge.setImmovable(true);
      leftWall.setImmovable(true);
      right.setImmovable(true);
      bottom.setImmovable(true);
      table.setImmovable(true);
      couchBarrier.setImmovable(true);
      chairBarrierR.setImmovable(true);
      chairBarrierL.setImmovable(true);
      counter.setPosition(678, 303);
      sinkFridge.setPosition(450, 65);
      leftWall.setPosition(20, 65);
      right.setPosition(742, 200);
      bottom.setPosition(500, 520);
      table.setPosition(195, 312);
      couchBarrier.setPosition(390, 290);
      chairBarrierL.setPosition(245, 220);
      chairBarrierR.setPosition(535, 220);

      // watering arrow
      var flowerArrow = this.add.image(0, 0, "arrow");
      flowerArrow.setPosition(42, 330);
      
      // flower mini game
      flowerArrow.setInteractive().on('pointerdown', function (pointer) {
          // ppl moving area
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
        
          if ((x < 100) && (y < 450 && y > 250)) {
              /*this.scene.start("Sflower", {
                  'posX': x + 27.8,
                  'posY': y + 44.45
              })*/
              console.log("start minigame")
          }
      }, this)

      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();

      var bookArrow = this.add.image(0, 0, "arrow");
      bookArrow.setPosition(622, 70);
      bookArrow.setInteractive().on('pointerdown', function (pointer) {
      if(this.player.body.position.x > 525 && this.player.body.position.y < 165 && this.player.body.position.x < 660){
            this.scene.start("bookSorting", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64});
        }
      }, this);
      
      var carpetArrow = this.add.image(0, 0, "arrow");
      carpetArrow.setPosition(390, 250);
      carpetArrow.setInteractive().on('pointerdown', function (pointer) {
        if(this.player.body.position.x > 270 && this.player.body.position.x < 450 && this.player.body.position.y < 230 && this.player.body.position.y > 150){
            //replace "dogFeeding" with the name of the vacuum minigame scene
            console.log("start minigame")
            //this.scene.start("dogFeeding", {'posX': this.player.body.position.x + 27.8, 'posY': this.player.body.position.y + 44.45});
        }
      }, this);

      //add exit to room page - back to level page and exit
      var text_style = {
          font: 'bold 32px Arial',
          color: '#fff'
      }
      var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(300, 600, 'Back to level', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('levelSelect')
      }, this);

      var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(600, 600, 'Exit', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('mainMenu')
      }, this);

      this.physics.add.collider(this.walls, this.player);

      this.add.text(30, 570, "Use Arrow Keys to move, click on orange arrow while nearby to start minigame");
  }

  update(){
      this.movePlayerManager();
  }

movePlayerManager(){

    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
      this.player.play("walkLeftAnim", true);
    } else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
      this.player.play("walkRightAnim", true);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
      this.player.play("walkUpAnim", true);
    } else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
      this.player.play("walkDownAnim", true);
    }

    if(this.cursorKeys.up.isUp && this.cursorKeys.down.isUp && this.cursorKeys.left.isUp && this.cursorKeys.right.isUp) {
        this.player.setTexture("player");
    }
  }
}