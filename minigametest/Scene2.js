class Scene2 extends Phaser.Scene {

    constructor() {
      super("playGame");
    }

    init(data){
      console.log(data.posX);
      this.lastPosX = data.posX;
      console.log(this.lastPosX)
      
      console.log(data.posY);
      this.lastPosY = data.posY;
      console.log(this.lastPosY)
    }

    create() {
  
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
      this.background.setOrigin(0, 0);

      this.physics.world.setBoundsCollision();
  
      this.powerUps = this.physics.add.group();
  
  
      for (var i = 0; i < gameSettings.maxPowerups; i++) {
        var powerUp = this.physics.add.sprite(16, 16, "power-up");
        this.powerUps.add(powerUp);
         powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
  
        if (Math.random() > 0.5) {
          powerUp.play("red");
        } else {
          powerUp.play("gray");
        }
  
        powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
        powerUp.setCollideWorldBounds(true);
        //this.powerUps.body.stop();
        this.physics.add.collider(this.powerUps, this.powerUps);
        powerUp.setBounce(1);
  
      }
  
      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.play("thrust");
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);


      // switches to Scene3 when the player touches a power-up.
      // Keeps the players x and y posistion for when they switch back to Scene2
      // this is an adaptation of my game for the last assignment
      // This is just a proof of concept for switching scenes to the minigame while still storing values in the main game
      // currently I only store x and y position but this could be used to store all of the varaibles
      var collider = this.physics.add.collider(this.player, this.powerUps, null, function (){
        this.scene.start("miniGame", {'posX': this.player.body.position.x + 8, 'posY': this.player.body.position.y + 12});
      }, this);    


    }
  
    update() {
  
      this.background.tilePositionY -= 0.5;
  
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
  