var stainCount = 3;

class dishWashing extends Phaser.Scene{
    constructor(){
        super("dishWashing");
    }

    init(data){
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
    }

    preload(){
        this.load.image("plate","assets/plate.png");
        this.load.image("stain1","assets/stain1.png");
        this.load.image("stain2","assets/stain2.png");
        this.load.image("stain3","assets/stain3.png");
    }
    create(){
        stainCount = 3;
        var plate = this.add.image(64, 64, "plate");
        plate.setPosition(game.config.width/2, game.config.height/2);
        plate.setScale(5);
        var stain1 = this.add.image(0, 0, "stain1");
        var stain2 = this.add.image(0, 0, "stain2");
        var stain3 = this.add.image(0, 0, "stain3");
        stain1.setScale(5);
        stain2.setScale(5);
        stain3.setScale(5);
        stain1.setRandomPosition(200, 200, 400, 400);
        stain2.setRandomPosition(200, 200, 400, 400);
        stain3.setRandomPosition(200, 200, 400, 400);
        stain1.setInteractive();
        stain2.setInteractive();
        stain3.setInteractive();
        this.input.on('gameobjectdown', this.destroyStain, this);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(20, 670, "Click stains on plate to remove");
    }

    destroyStain(pointer, gameObject) {
        gameObject.destroy();
        stainCount--;
        if (stainCount <= 0) {
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