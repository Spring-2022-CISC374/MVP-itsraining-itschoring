class mainMenu extends Phaser.Scene {
    constructor () {
        super('mainMenu');
    }

    preload () {
      this.load.image("titleBG", "assets/titleBG.jpg");

      this.load.image("kitchenBG","assets/kitchen.png");
      this.load.image("livingRoomBG","assets/livingRoom.png");
      this.load.image("bedroom1BG","assets/bedroom1default.jpg");
      this.load.image("bedroom2BG", "assets/bedroom2.png");
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

      this.load.image("foodfunnel", "assets/foodfunnel.png")
      this.load.image("food", "assets/food.png");
      this.load.image("empty", "assets/empty.png");
      this.load.image("dogFeedingBG", "assets/dogFeedingBackground.png");

      this.load.image("plate","assets/plate.png");
      this.load.image("stain1","assets/stain1.png");
      this.load.image("stain2","assets/stain2.png");
      this.load.image("stain3","assets/stain3.png");
      this.load.image("dishWashingBG", "assets/dishWashingBG.png");

      this.load.image("flower1", "assets/01.png");
      this.load.image("flower2", "assets/02.png");
      this.load.image("flower3", "assets/03.png");
      this.load.image("flower4", "assets/final.png");
      this.load.image("watering", "assets/watering.png");
      this.load.image("waterdrop", "assets/waterdrop.jpg");

      this.load.image("garbage", "assets/garbage.png");
      this.load.image("trash", "assets/trash-icon.jpg");
      this.load.image("trashBG", "assets/trashBackground.png");

      this.load.image("redbook", "assets/redbook.png");
      this.load.image("yellowbook", "assets/yellowbook.png");
      this.load.image("greenbook", "assets/greenbook.png");
      this.load.image("bluebook", "assets/bluebook.png");
      this.load.image("cyanbook", "assets/cyanbook.png");
      this.load.image("pinkbook", "assets/pinkbook.png");
      this.load.image("bookSortingBG", "assets/bookSortingBG.png");
      this.load.image("bookSortingv2BG", "assets/bookSortingv2Background.png");

      this.load.image("vacuumingBG", "assets/vacuumingBackground.png");
      this.load.image("carpet", "assets/carpet.png");
      this.load.image("dirt", "assets/dirt.png");
      this.load.image("vacuum", "assets/vacuum.png");

      this.load.image("bed1V1", "assets/bed1V1.png");
      this.load.image("bed1V2", "assets/bed1V2.png");
      this.load.image("bed1V3", "assets/bed1V3.png");
      this.load.image("bed1V4", "assets/bed1V4.png");
      this.load.image("greenButton", "assets/greenButton.png");

      this.load.image("bed2V1", "assets/bed2V1.png");
      this.load.image("bed2V2", "assets/bed2V2.png");
      this.load.image("bed2V3", "assets/bed2V3.png");
      this.load.image("bed2V4", "assets/bed2V4.png");

      this.load.image("clothes1", "assets/clothes1.png");
      this.load.image("clothes2", "assets/clothes2.png");
      this.load.image("clothes3", "assets/clothes3.png");
      this.load.image("clothes4", "assets/clothes4.png");
      this.load.image("closet", "assets/Closet.jpg");
    }

    create () {
        var background = this.add.image(game.config.width/2, game.config.height/2, "titleBG");
        background.setScale(0.7);

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