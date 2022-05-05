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
        var carpet = this.add.image(0, 0, "carpet");
        carpet.setPosition(100, 200);
        carpet.setScale(1.5);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.add.text(200, 325, "Use Arrow Keys to move vacuum and pick up dirt");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }

        this.exitGameManager();
    }

    exitGameManager() {
        if (this.food.y === this.foodbowl.y) {
            if (this.food.x - this.foodbowl.x > -100 && this.food.x - this.foodbowl.x < 100) {
                this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
            }
        }
    }
}