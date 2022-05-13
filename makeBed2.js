var buttonCount = 21;
var SecondSet = false
var ThirdSet = false

class makeBed2 extends Phaser.Scene{
    constructor(){
        super("makeBed2");
    }

    init(data){
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
        this.playtime = data.playtime || 0;
    }

    preload(){}
    
    create(){
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.playtime++
            }
        })
        var background = this.add.image(0,0, "bed2V1");
        background.scale = 1.67;
        background.setOrigin(0, 0);

        SecondSet = false
        ThirdSet = false
        buttonCount = 21;
        var button1 = this.add.image(240, 370, "greenButton");
        var button2 = this.add.image(380, 410, "greenButton");
        var button3 = this.add.image(520, 420, "greenButton");
        var button13 = this.add.image(665, 470, "greenButton");
        var button14 = this.add.image(150, 430, "greenButton");
        button1.setInteractive();
        button2.setInteractive();
        button3.setInteractive();
        button13.setInteractive();
        button14.setInteractive();
        this.input.on('gameobjectdown', this.destroyButton, this);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        this.add.text(20, 670, "click the green buttons to make the bed");
    }

    destroyButton(pointer, gameObject) {
        gameObject.destroy();
        buttonCount--;
        console.log(buttonCount)
        if (buttonCount == 16) {
            SecondSet = true
            //this.scene.start("bedroom1", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            //'completion': [1, this.completion[1], this.completion[2], this.completion[3]]});
        }
        if(buttonCount == 7){
            ThirdSet = true
        }
        if(buttonCount == -24){
            var background = this.add.image(0,0, "bed2V4");
            background.scale = 1.67;
            background.setOrigin(0, 0);

            console.log("done");
            this.time.addEvent({
                delay: 1000,
                repeat: 0,
                callback: () => this.scene.start("bedroom2", {'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [1, this.completion[1], this.completion[2], this.completion[3]],
                'playtime': this.playtime
               })
            });
        }
    }
    update(){
        // Switches back to kitchen level, passing back the x and y position of the player.
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("bedroom2", {'posX': this.lastPosX, 'posY': this.lastPosY, 
            'completion': [1, this.completion[1], this.completion[2], this.completion[3]],
            'playtime': this.playtime
          });
        }
        if(SecondSet){
            console.log("yay");
            SecondSet = false;
            var background = this.add.image(0,0, "bed2V2");
            background.scale = 1.67;
            background.setOrigin(0, 0);
            var button4 = this.add.image(240, 220, "greenButton");
            var button5 = this.add.image(380, 235, "greenButton");
            var button6 = this.add.image(520, 250, "greenButton");
            var button15 = this.add.image(310, 237, "greenButton");
            var button16 = this.add.image(450, 255, "greenButton");
            button4.setInteractive();
            button5.setInteractive();
            button6.setInteractive();
            button15.setInteractive();
            button16.setInteractive();
            this.input.on('gameobjectdown', this.destroyButton, this);
        }
        if(ThirdSet){
            console.log("yay")
            ThirdSet = false;
            var background = this.add.image(0,0, "bed2V3");
            background.scale = 1.67;
            background.setOrigin(0, 0);
            var button7 = this.add.image(170, 120, "greenButton");
            var button8 = this.add.image(166, 330, "greenButton");
            var button9 = this.add.image(174, 500, "greenButton");
            var button10 = this.add.image(590, 135, "greenButton");
            var button11 = this.add.image(590, 300, "greenButton");
            var button12 = this.add.image(575, 525, "greenButton");
            var button17 = this.add.image(585, 410, "greenButton");
            var button18 = this.add.image(460, 540, "greenButton");
            var button19 = this.add.image(290, 542, "greenButton");
            var button20 = this.add.image(170, 225, "greenButton");
            button7.setInteractive();
            button8.setInteractive();
            button9.setInteractive();
            button10.setInteractive();
            button11.setInteractive();
            button12.setInteractive();
            button17.setInteractive();
            button18.setInteractive();
            button19.setInteractive();
            button20.setInteractive();
            this.input.on('gameobjectdown', this.destroyButton, this);
        }
    }
}