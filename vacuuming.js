var dirtCount = 3;

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
        this.leave = false;
        var carpet = this.add.image(0, 0, "carpet");
        carpet.setPosition(400, 350);
        carpet.setScale(3);

        this.vacuum = this.add.image(0, 0, "vacuum");

        this.dirtGroup = this.physics.add.group();

        this.dirt1 = this.add.image(0, 0, "dirt");
        this.dirt2 = this.add.image(0, 0, "dirt");
        this.dirt3 = this.add.image(0, 0, "dirt");
        this.dirt2.setAngle(180);
        this.dirt3.setAngle(90);
        this.dirt1.setScale(2.5);
        this.dirt2.setScale(2.5);
        this.dirt3.setScale(2.5);
        this.dirtGroup.add(dirt1);
        this.dirtGroup.add(dirt2);
        this.dirtGroup.add(dirt3);

        this.physics.add.collider(this.dirtGroup, this.vacuum);

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

        // this.exitGameManager();
    }

    // exitGameManager() {
    //     if (this.leave === true) {
    //             this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
    //         }
    //     }
    // }
}