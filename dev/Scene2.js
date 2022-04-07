class Scene2 extends Phaser.Scene{
    constructor(){
        super("Scene2");
    }

    preload(){
        this.load.image("background","assets/bg.png");
        
    }
    create(){
        var background = this.add.image(0, 0, "background");
        background.scale = 0.8;
        background.setOrigin(0, 0);
    }
}