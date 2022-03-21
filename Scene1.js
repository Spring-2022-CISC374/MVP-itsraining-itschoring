class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame"); // super ()inherit all the characteristit from phaser
    }

    preload(){
        this.load.image("background","pics/bg.png");
      
        
    }
    create(){
        this.add.text(30,30,"Loading game...");
        this.scene.start("playGame");
        


        
    }
}