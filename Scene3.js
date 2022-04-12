class Scene3 extends Phaser.Scene{
    constructor(){
        super("dishWashing");
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
    }
}