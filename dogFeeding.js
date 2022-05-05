class dogFeeding extends Phaser.Scene {
    constructor() {
        super("dogFeeding");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
    }

    preload() {}

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

        this.add.text(200, 325, "Click funnel to dispense food at the right time");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            'completion': [this.completion[0], 1, this.completion[2], this.completion[3]]});
        }

        this.exitGameManager();
    }

    exitGameManager() {
        if (this.food.y === this.foodbowl.y) {
            if (this.food.x - this.foodbowl.x > -100 && this.food.x - this.foodbowl.x < 100) {
                this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
                'completion': [this.completion[0], 1, this.completion[2], this.completion[3]]});
            }
        }
    }
}