class vacuuming extends Phaser.Scene {
    constructor() {
        super("vacuuming");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
    }

    preload() {}

    create() {
        var background = this.add.image(game.config.width/2, game.config.height/2, "vacuumingBG");
        background.setScale(5.2);

        this.dirtCount = 3;
        var carpet = this.add.image(0, 0, "carpet");
        carpet.setPosition(400, 350);
        carpet.setScale(3);

        this.dirtGroup = this.physics.add.group();

        this.dirt1 = this.physics.add.sprite(0, 0, "dirt");
        this.dirt2 = this.physics.add.sprite(0, 0, "dirt");
        this.dirt3 = this.physics.add.sprite(0, 0, "dirt");
        this.dirt2.setAngle(180);
        this.dirt3.setAngle(90);
        this.dirt1.setScale(2.5);
        this.dirt2.setScale(2.5);
        this.dirt3.setScale(2.5);
        this.dirtGroup.add(this.dirt1);
        this.dirtGroup.add(this.dirt2);
        this.dirtGroup.add(this.dirt3);

        this.vacuum = this.physics.add.sprite(0, 0, "vacuum");
        this.vacuum.setScale(1.5);
        this.vacuum.setRandomPosition(100, 100, 500, 600);
        this.vacuum.setCollideWorldBounds(true);

        this.physics.add.overlap(this.vacuum, this.dirtGroup, function(vacuum, dirtSpot) {
            dirtSpot.disableBody(true, true);
            this.dirtCount--;
        }, null, this);

        this.dirt1.setRandomPosition(100, 300, 500, 200);
        this.dirt2.setRandomPosition(100, 300, 500, 200);
        this.dirt3.setRandomPosition(100, 300, 500, 200);
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.add.text(200, 75, "Use Arrow Keys to move vacuum and pick up dirt");

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }

        // if (Math.abs(this.dirt1.x - this.vacuum.x) < 40 && Math.abs(this.dirt1.y - this.vacuum.y) < 40) {
        //     this.dirt1.disableBody(true, true);
        //     this.dirtCount--;
        // }

        // if (Math.abs(this.dirt2.x - this.vacuum.x) < 40 && Math.abs(this.dirt2.y - this.vacuum.y) < 40) {
        //     this.dirt2.disableBody(true, true);
        //     this.dirtCount--;
        // }

        // if (Math.abs(this.dirt3.x - this.vacuum.x) < 40 && Math.abs(this.dirt3.y - this.vacuum.y) < 40) {
        //     this.dirt3.disableBody(true, true);
        //     this.dirtCount--;
        // }

        this.moveVacuumManager();
        this.exitGameManager();
    }

    exitGameManager() {
        if (this.dirtCount <= 0) {
            this.time.addEvent({
                delay: 1000,
                repeat: 0,
                callback: () => this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY})
            });
        }
    }

    moveVacuumManager() {
        this.vacuum.setVelocity(0);

        if(this.cursorKeys.left.isDown){
            this.vacuum.setVelocityX(-gameSettings.playerSpeed);
            this.vacuum.setAngle(270);
        } else if(this.cursorKeys.right.isDown){
            this.vacuum.setVelocityX(gameSettings.playerSpeed);
            this.vacuum.setAngle(90);
        }

        if(this.cursorKeys.up.isDown){
            this.vacuum.setVelocityY(-gameSettings.playerSpeed);
            this.vacuum.setAngle(0);
        } else if(this.cursorKeys.down.isDown){
            this.vacuum.setVelocityY(gameSettings.playerSpeed);
            this.vacuum.setAngle(180);
        }
    }
}
