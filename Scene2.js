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
            // Go to dishwashing minigame
            this.scene.start("dishWashing", {'posX': this.player.body.position.x + 8, 'posY': this.player.body.position.y + 12});
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