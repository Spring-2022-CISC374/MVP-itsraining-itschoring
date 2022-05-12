class bedroom1 extends Phaser.Scene{
  constructor(){
      super("bedroom1");
  }

  init(data){
      this.lastPosX = data.posX;
      this.lastPosY = data.posY;
      this.completion = data.completion;
  }

  preload(){}

  create(){
      var background = this.add.image(0, 0, "bedroom1BG");
      background.scale = 1.67;
      background.setOrigin(0, 0);

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
      counter.setPosition(800, 360);
      sinkFridge.setPosition(500, 120);
      leftWall.setPosition(20, 65);
      right.setPosition(770, 200);
      bottom.setPosition(500, 565);
      table.setPosition(190, 200);
      //load trash can 
      var trash = this.physics.add.image(0, 0, "trash");
      trash.setPosition(350, 250); // 400 310
      trash.setScale(0.2);
      trash.setImmovable(true);

      // arrow icon for trash can 
      var trashArrow = this.add.image(0, 0, "arrow");
      trashArrow.setPosition(350, 200); 
      // Arrow click event => enter trash pickup mini-game scene

      trashArrow.setInteractive().on('pointerdown', function (pointer) {
          // Limit the character to a certain range of the trash can to click to trigger
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
          if ((x > 200 && x < 400) && (y < 220 && y > 100)) {
            this.scene.start("trashGame", {
              'posX': x + 64,
              'posY': y + 64,
              'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
              'level': 3,
          })
      }
  }, this)

      // watering arrow
      var clothesArrow = this.add.image(0, 0, "arrow");
      clothesArrow.setPosition(120, 390);
      
      // flower mini game
      clothesArrow.setInteractive().on('pointerdown', function (pointer) {
          // ppl moving area
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
        
          if ((x < 250) && (y > 300)) {
              console.log("clothes");
              /*this.scene.start("Sflower", {
                  'posX': x + 27.8,
                  'posY': y + 44.45
              })*/
              this.scene.start("PackClothes", {
                'posX': x + 64,
                'posY': y + 64,
                'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                'level': 3,
            })
          }
      }, this)

      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();

      var bedArrow = this.add.image(0, 0, "arrow");
      bedArrow.setPosition(670, 335);
      bedArrow.setInteractive().on('pointerdown', function (pointer) {
      if(this.player.body.position.x > 460 && this.player.body.position.y > 200){
            console.log("bed")
            this.scene.start("makeBed1", {'posX': this.player.body.position.x + 27.8, 'posY': this.player.body.position.y + 44.45});
        }
      }, this);
      
      var bookArrow = this.add.image(0, 0, "arrow");
      bookArrow.setPosition(630, 490);

      bookArrow.setInteractive().on('pointerdown', function (pointer) {
        if(this.player.body.position.x > 510 && this.player.body.position.y > 350){
          this.scene.start("bookSortingv2", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64});
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