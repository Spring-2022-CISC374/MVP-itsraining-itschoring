class Scene2 extends Phaser.Scene{
  constructor(){
      super("Scene2");
  }

  init(data){
      this.lastPosX = data.posX;
      this.lastPosY = data.posY;
  }

  preload(){
      this.load.image("background","assets/room4.png");
      this.load.image("arrow", "assets/arrow.png");
      this.load.image("player", "assets/chracter1.png");
      this.load.image("counter", "assets/counter.png");
      this.load.image("sinkFridge", "assets/sinkFridge.png");
      this.load.image("leftWall", "assets/leftWall.png");
      this.load.image("right", "assets/right.png");
      this.load.image("bottom", "assets/bottom.png");
      this.load.image("table", "assets/table.png");
      
  }
  create(){
      var background = this.add.image(0, 0, "background");
      background.scale = 1.65;
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
      counter.setPosition(678, 303);
      sinkFridge.setPosition(640, 120);
      leftWall.setPosition(20, 65);
      right.setPosition(742, 200);
      bottom.setPosition(500, 565);
      table.setPosition(195, 312);

      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setScale(0.1);
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      var arrow = this.add.image(0, 0, "arrow");
      arrow.setPosition(650, 90);
      arrow.setInteractive().on('pointerdown', function (pointer) {
          console.log(this.player.body.position.x)
          console.log(this.player.body.position.y)
          if(this.player.body.position.x > 525 && this.player.body.position.y < 165){
            // Go to dishwashing minigame

            this.scene.start("dishWashing", {'posX': this.player.body.position.x + 27.8, 'posY': this.player.body.position.y + 44.45});
          }
      }, this);

      //add exit to room page - back to level page and exit
      var text_style = {
          font: 'bold 32px Arial',
          color: '#fff'
      }
      var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(300, 700, 'Back to level', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('Scene1')
      }, this);

      var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(600, 700, 'Exit', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('Scene0')
      }, this);

      this.physics.add.collider(this.walls, this.player);
  }

  update(){
      this.movePlayerManager();
  }

  movePlayerManager(){

      this.player.setVelocity(0);
  
      if(this.cursorKeys.left.isDown){
        this.player.setVelocityX(-gameSettings.playerSpeed);
      }else if(this.cursorKeys.right.isDown){
        this.player.setVelocityX(gameSettings.playerSpeed);
      }
  
      if(this.cursorKeys.up.isDown){
        this.player.setVelocityY(-gameSettings.playerSpeed);
      }else if(this.cursorKeys.down.isDown){
        this.player.setVelocityY(gameSettings.playerSpeed);
      }
    }
}