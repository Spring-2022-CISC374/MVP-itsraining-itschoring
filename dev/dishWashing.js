class dishWashing extends Phaser.Scene{
    constructor(){
        super("dishWashing");
    }

    init(data){
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
    }

    preload(){}
    
    create(){
        var background = this.add.image(game.config.width/2, game.config.height/2, "dishWashingBG");
        background.setScale(5.3);
        this.plateCount = 3;
        this.stainCount = 3;
        var plate = this.add.image(64, 64, "plate");
        plate.setPosition(game.config.width/2, game.config.height/2);
        plate.setScale(5);
        this.stain1 = this.physics.add.sprite(0, 0, "stain1");
        this.stain2 = this.physics.add.sprite(0, 0, "stain2");
        this.stain3 = this.physics.add.sprite(0, 0, "stain3");
        this.stain1.setScale(5);
        this.stain2.setScale(5);
        this.stain3.setScale(5);
        this.stain1.setRandomPosition(200, 200, 400, 400);
        this.stain2.setRandomPosition(200, 200, 400, 400);
        this.stain3.setRandomPosition(200, 200, 400, 400);
        this.stain1.setInteractive();
        this.stain2.setInteractive();
        this.stain3.setInteractive();
        this.input.on('gameobjectdown', this.destroyStain, this);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(20, 670, "Click stains on plate to remove");
    }

    destroyStain(pointer, gameObject) {
        gameObject.disableBody(true, true);
        this.stainCount--;
        if (this.stainCount === 0) {
            this.stain1.enableBody(true, 200, 200, true, true);
            this.stain2.enableBody(true, 200, 200, true, true);
            this.stain3.enableBody(true, 200, 200, true, true);
            this.stain1.setRandomPosition(200, 200, 400, 400);
            this.stain2.setRandomPosition(200, 200, 400, 400);
            this.stain3.setRandomPosition(200, 200, 400, 400);
            this.plateCount--;
            this.stainCount = 3;
        }
        if (this.plateCount <= 0) {
            this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            'completion': [1, this.completion[1], this.completion[2], this.completion[3]]});
        }
    }

    update(){
        // Switches back to kitchen level, passing back the x and y position of the player.
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("kitchen", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            'completion': [1, this.completion[1], this.completion[2], this.completion[3]]});

        }
    }
}