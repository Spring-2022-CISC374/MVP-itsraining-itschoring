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
        this.load.image("foodbowl", "assets/foodbowl.png");
        
    }
    create(){
        var background = this.add.image(0, 0, "background");
        background.scale = 1.65;
        background.setOrigin(0, 0);
        this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
        this.player.setScale(0.1);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        var dishArrow = this.add.image(0, 0, "arrow");
        dishArrow.setPosition(650, 90);
        dishArrow.setInteractive().on('pointerdown', function (pointer) {
            // Go to dishwashing minigame
            this.scene.start("dishWashing", {'posX': this.player.body.position.x + 27.8, 'posY': this.player.body.position.y + 44.45});
        }, this);
        var foodbowl = this.add.image(0, 0, "foodbowl");
        foodbowl.setPosition(30, 165);
        foodbowl.setScale(1.75);
        var foodArrow = this.add.image(0, 0, "arrow");
        foodArrow.setPosition(30, 135);
        foodArrow.setInteractive().on('pointerdown', function (pointer) {
            this.scene.start("dogFeeding", {'posX': this.player.body.position.x + 27.8, 'posY': this.player.body.position.y + 44.45});
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