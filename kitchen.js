class kitchen extends Phaser.Scene{
  constructor(){
      super("kitchen");
  }

  init(data){
      this.lastPosX = data.posX;
      this.lastPosY = data.posY;
  }

  preload(){
      this.load.image("background","assets/kitchen.png");
      this.load.image("arrow", "assets/arrow.png");
      this.load.spritesheet("player", "assets/spritesheets/charStill.png",{
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.spritesheet("walkLeft", "assets/spritesheets/charWalkLeft.png",{
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.spritesheet("walkRight", "assets/spritesheets/charWalkRight.png",{
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.spritesheet("walkUp", "assets/spritesheets/charWalkUp.png",{
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.spritesheet("walkDown", "assets/spritesheets/charWalkDown.png",{
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.image("foodbowl", "assets/foodbowl.png");
      this.load.image("trash", "assets/trash-icon.jpg");
      this.load.image("counter", "assets/counter.png");
      this.load.image("sinkFridge", "assets/sinkFridge.png");
      this.load.image("leftWall", "assets/leftWall.png");
      this.load.image("right", "assets/right.png");
      this.load.image("bottom", "assets/bottom.png");
      this.load.image("table", "assets/table.png");
      
  }
  create(){
      var background = this.add.image(0, 0, "background");
      background.scale = 1.67;
      background.setOrigin(0, 0);

      this.anims.create({
        key: "walkLeftAnim",
        frames: this.anims.generateFrameNumbers("walkLeft"),
        frameRate: 8,
        repeat: -1
      });
      this.anims.create({
        key: "walkRightAnim",
        frames: this.anims.generateFrameNumbers("walkRight"),
        frameRate: 8,
        repeat: -1
      });
      this.anims.create({
        key: "walkUpAnim",
        frames: this.anims.generateFrameNumbers("walkUp"),
        frameRate: 8,
        repeat: -1
      });
      this.anims.create({
        key: "walkDownAnim",
        frames: this.anims.generateFrameNumbers("walkDown"),
        frameRate: 8,
        repeat: -1
      });

      this.walls = this.physics.add.group();
      var counter = this.physics.add.image(0, 0, "counter");
      var sinkFridge = this.physics.add.image(0, 0, "sinkFridge");
      var leftWall = this.physics.add.image(0, 0, "leftWall");
      var right = this.physics.add.image(0, 0, "right");
      var bottom = this.physics.add.image(0, 0, "bottom");
      var table = this.physics.add.image(0, 0, "table");
      this.walls.add(counter);
      this.walls.add(sinkFridge);
      this.walls.add(leftWall);
      this.walls.add(right);
      this.walls.add(bottom);
      this.walls.add(table);
      counter.setImmovable(true);
      sinkFridge.setImmovable(true);
      leftWall.setImmovable(true);
      right.setImmovable(true);
      bottom.setImmovable(true);
      table.setImmovable(true);
      counter.setPosition(678, 303);
      sinkFridge.setPosition(640, 120);
      leftWall.setPosition(20, 65);
      right.setPosition(742, 200);
      bottom.setPosition(500, 565);
      table.setPosition(195, 312);
      //load trash can 
      var trash = this.physics.add.image(0, 0, "trash");
      trash.setPosition(450, 340); // 400 310
      trash.setScale(0.2);
      trash.setImmovable(true);

      // arrow icon for trash can 
      var trashArrow = this.add.image(0, 0, "arrow");
      trashArrow.setPosition(450, 300);
      // Arrow click event => enter trash pickup mini-game scene

      trashArrow.setInteractive().on('pointerdown', function (pointer) {
          // Limit the character to a certain range of the trash can to click to trigger
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
          if ((x > 350 && x < 500) && (y < 400 && y > 250)) {
              this.scene.start("trashGame", {
                  'posX': x + 64,
                  'posY': y + 64
              })
          }
      }, this)

      // watering arrow
      var flowerArrow = this.add.image(0, 0, "arrow");
      flowerArrow.setPosition(45, 330);
      
      // flower mini game
      flowerArrow.setInteractive().on('pointerdown', function (pointer) {
          // ppl moving area
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
        
          if ((x < 100 && x > 0) && (y < 450 && y > 250)) {
              this.scene.start("Sflower", {
                  'posX': x + 64,
                  'posY': y + 64
              })
          }
      }, this)

      var foodbowl = this.add.image(0, 0, "foodbowl");
      foodbowl.setPosition(30, 165);
      foodbowl.setScale(1.75);
      var foodArrow = this.add.image(0, 0, "arrow");
      foodArrow.setPosition(30, 135);

      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setScale(1);
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      var dishArrow = this.add.image(0, 0, "arrow");
      dishArrow.setPosition(650, 90);
      dishArrow.setInteractive().on('pointerdown', function (pointer) {
      if(this.player.body.position.x > 525 && this.player.body.position.y < 165){
            // Go to dishwashing minigame
            this.scene.start("dishWashing", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64});
        }
      }, this);
      
      foodArrow.setInteractive().on('pointerdown', function (pointer) {
        if(this.player.body.position.x < 60 && this.player.body.position.y < 175){
          this.scene.start("dogFeeding", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64});
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