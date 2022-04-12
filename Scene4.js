class Scene4 extends Phaser.Scene {
    constructor() {
        super("dogFeeding");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
    }

    preload() {
        this.load.image("foodfunnel", "assets/foodfunnel.png")
        this.load.image("foodbowl", "assets/foodbowl.png");
        this.load.image("food", "assets/food.png");
        this.load.image("empty", "assets/empty.png");
    }

    create() {
        var foodFunnel = this.physics.add.image(0, 0, "foodfunnel");
        foodFunnel.setPosition(400, 80);
        foodFunnel.setScale(5);
        foodFunnel.setVelocityX(150);
        foodFunnel.setCollideWorldBounds(true);
        foodFunnel.setBounceX(1);

        this.food = this.physics.add.image(0, 0, "empty");
        var foodVar = this.food;

        this.foodbowl = this.add.image(0, 0, "foodbowl");
        this.foodbowl.setRandomPosition(200, 600, 400, 0);
        this.foodbowl.setScale(6);

        foodFunnel.setInteractive().on('pointerdown', function (pointer) {
            foodVar.setPosition(foodFunnel.x, foodFunnel.y + 80);
            foodVar.setTexture("food");
            foodVar.setVelocityY(150);
        })

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("Scene2", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }

        this.exitGameManager();
    }

    exitGameManager() {
        if (this.food.y === this.foodbowl.y) {
            if (this.food.x - this.foodbowl.x > -100 && this.food.x - this.foodbowl.x < 100) {
                this.scene.start("Scene2", {'posX': this.lastPosX, 'posY': this.lastPosY});
            }
        }
    }
}