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
        var background = this.add.image(game.config.width/2, game.config.height/2, "dogFeedingBG");
        background.setScale(5.2);
        this.foodFunnel = this.physics.add.image(0, 0, "foodfunnel");
        this.foodFunnel.setPosition(400, 80);
        this.foodFunnel.setScale(5);
        this.foodFunnel.setVelocityX(150);
        this.foodFunnel.setCollideWorldBounds(true);
        this.foodFunnel.setBounceX(1);

        this.foodGroup = this.physics.add.group();

        this.foodbowl = this.physics.add.sprite(0, 0, "foodbowl");
        this.foodbowl.setRandomPosition(200, 600, 400, 0);
        this.foodbowl.setScale(6);

        this.physics.add.overlap(this.foodbowl, this.foodGroup, this.exitGameManager, undefined, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.add.text(200, 325, "Press Down Arrow to dispense food at the right time");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            'completion': [this.completion[0], 1, this.completion[2], this.completion[3]]});
        }
        if (Phaser.Input.Keyboard.JustDown(this.down)) {
            var food = this.foodGroup.create(this.foodFunnel.x, this.foodFunnel.y + 80, "food");
            this.foodGroup.add(food);
            food.setVelocityY(150);
        }
    }

    exitGameManager() {
        this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
        'completion': [this.completion[0], 1, this.completion[2], this.completion[3]]}); 
    }
}