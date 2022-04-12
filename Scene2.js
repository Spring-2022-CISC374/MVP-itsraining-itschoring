class Scene2 extends Phaser.Scene{
  constructor(){
      super("Scene2");
  }

  init(data){
      //console.log(data.posX);
      this.lastPosX = data.posX;
      //console.log(this.lastPosX)
      
      //console.log(data.posY);
      this.lastPosY = data.posY;
      //console.log(this.lastPosY)
  }

  preload(){
      this.load.image("background","assets/room4.png");
      this.load.image("arrow", "assets/arrow.png");
      this.load.image("player", "assets/chracter1.png");
      
  }
  create(){
      var background = this.add.image(0, 0, "background");
      background.scale = 1.65;
      background.setOrigin(0, 0);
      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setScale(0.1);
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