class Scene2 extends Phaser.Scene{
    constructor(){
        super("Scene2");
    }

    init(data){
        console.log(data.posX);
        this.lastPosX = data.posX;
        console.log(this.lastPosX)
        
        console.log(data.posY);
        this.lastPosY = data.posY;
        console.log(this.lastPosY)
    }

    preload(){
        this.load.image("background","assets/bg.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.spritesheet("player", "assets/spritesheets/player.png",{
            frameWidth: 16,
            frameHeight: 24
        });
        
    }
    create(){
        var background = this.add.image(0, 0, "background");
        background.scale = 0.8;
        background.setOrigin(0, 0);
        this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        var arrow = this.add.image(0, 0, "arrow");
        arrow.setPosition(565, 215);
        arrow.setInteractive().on('pointerdown', function (pointer) {
            // Go to dishwashing minigame
            this.scene.start("dishWashing", {'posX': this.player.body.position.x + 8, 'posY': this.player.body.position.y + 12});
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