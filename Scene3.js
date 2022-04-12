class Scene3 extends Phaser.Scene{
    constructor(){
        super("dishWashing");
    }

    init(data){
        console.log(data.posX);
        this.lastPosX = data.posX;
        console.log(this.lastPosX)
        
        console.log(data.posY);
        this.lastPosY = data.posY;
        console.log(this.lastPosY)
    }

    preload(){
        this.load.image("plate","assets/plate.png");
        this.load.image("stain1","assets/stain1.png");
        this.load.image("stain2","assets/stain2.png");
        this.load.image("stain3","assets/stain3.png");
    }
    create(){
        var bg = this.add.image(0, 0, "plate");
        bg.scale = 0.8;
        bg.setOrigin(0, 0);
        var plate = this.add.image(0, 0, "plate");
        plate.setPosition(300, 300);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        // Switches back to Scene2 passing back the x and y position of the player.
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("Scene2", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }
    }
}