class mainMenu extends Phaser.Scene {
    constructor () {
        super('mainMenu');
    }

    preload () {
      this.load.image("kitchenBG","assets/kitchen.png");
      this.load.image("livingRoomBG","assets/livingRoom.png");
      this.load.image("bedroom1BG","assets/bedroom1.jpg");
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
      this.load.image("couchBarrier", "assets/couchBarrier.png");
      this.load.image("chairBarrier", "assets/chairBarrier.png");
    }

    create () {
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
        
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;

        var text_title1 = this.add.text(centerX - 100, 150, "It's Raining", text_style);
        var text_title2 = this.add.text(centerX - 100, 250, "It's Choring", text_style);

        var text_start = this.add.text(100, 600, 'Start', text_style);
        text_start.setInteractive();
        text_start.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('levelSelect')
        }, this);

        var text_exit = this.add.text(600, 600, 'Exit', text_style);
        text_exit.setInteractive();
        text_exit.on('pointerdown', function (pointer) {
            // exit game
            this.scene.stop('mainMenu')
        });
    }
}