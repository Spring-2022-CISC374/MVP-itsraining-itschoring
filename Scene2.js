class Scene2 extends Phaser.Scene{
    constructor(){
        super("Scene2");
    }

    preload(){
        this.load.image("background","assets/bg.png");
        this.load.image("arrow", "assets/arrow.png");
        
    }
    create(){
        var background = this.add.image(0, 0, "background");
        background.scale = 0.8;
        background.setOrigin(0, 0);
        var arrow = this.add.image(0, 0, "arrow");
        arrow.setPosition(565, 215);
        arrow.setInteractive().on('pointerdown', function (pointer) {
            // Go to dishwashing minigame
            this.scene.start("dishWashing")
        }, this);
    }
}