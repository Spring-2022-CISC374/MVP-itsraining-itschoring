class Scene3 extends Phaser.Scene {
    constructor() {
      super("miniGame");
    }

    init(data){
        console.log(data.posX);
        this.curPosX = data.posX;
        console.log(this.curPosX)
        
        console.log(data.posY);
        this.curPosY = data.posY;
        console.log(this.curPosY)
    }

    create(){
        console.log(this.curPosX);
        this.add.text(50,50,"mini game will go here, space to exit minigame");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        // Switches back to Scene2 passing back the x and y position of the player.
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("playGame", {'posX': this.curPosX, 'posY': this.curPosY});
           }
    }
}