class vacuuming extends Phaser.Scene {
    constructor() {
        super("vacuuming");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
    }

    preload() {
        this.load.image("foodfunnel", "assets/foodfunnel.png")
        this.load.image("foodbowl", "assets/foodbowl.png");
        this.load.image("food", "assets/food.png");
        this.load.image("empty", "assets/empty.png");
    }

    create() {
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