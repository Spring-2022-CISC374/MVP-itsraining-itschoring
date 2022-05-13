class bookSortingv2 extends Phaser.Scene{
    constructor(){
        super("bookSortingv2");
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
        var background = this.add.image(game.config.width/2, game.config.height/2, "bookSortingv2BG");
        background.setScale(5.2);

        this.bookCount = 6;
        this.redbook = this.add.image(0, 0, "redbook");
        this.yellowbook = this.add.image(0, 0, "yellowbook");
        this.greenbook = this.add.image(0, 0, "greenbook");
        this.bluebook = this.add.image(0, 0, "bluebook");
        this.pinkbook = this.add.image(0, 0, "pinkbook");
        this.cyanbook = this.add.image(0, 0, "cyanbook");

        this.cyanbook.setPosition(200, 250);
        this.pinkbook.setPosition(200, 500);
        this.yellowbook.setPosition(400, 250);
        this.bluebook.setPosition(400, 500);
        this.redbook.setPosition(600, 250);
        this.greenbook.setPosition(600, 500)

        this.redbook.setScale(1.3);
        this.yellowbook.setScale(1.3);
        this.greenbook.setScale(1.3);
        this.bluebook.setScale(1.3);
        this.cyanbook.setScale(1.3);
        this.pinkbook.setScale(1.3);
    
        this.redbook.setInteractive();
        this.yellowbook.setInteractive();
        this.greenbook.setInteractive();
        this.bluebook.setInteractive();
        this.cyanbook.setInteractive();
        this.pinkbook.setInteractive();
        this.input.on('gameobjectdown', this.removeBook, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(125, 100, "Click to sort in order: green, cyan, blue, pink, red, yellow");
    }

    removeBook(pointer, gameObject) {
        if (gameObject === this.greenbook && this.bookCount === 6) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.cyanbook && this.bookCount === 5) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.bluebook && this.bookCount === 4) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.pinkbook && this.bookCount === 3) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.redbook && this.bookCount === 2) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.yellowbook && this.bookCount === 1) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (this.bookCount <= 0) {
            this.scene.start("bedroom1", {'posX': this.lastPosX, 'posY': this.lastPosY,
            'completion': [this.completion[0], 1, this.completion[2], this.completion[3]],
            'playtime': this.playtime
        });
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("bedroom1", {'posX': this.lastPosX, 'posY': this.lastPosY,
            'completion': [this.completion[0], 1, this.completion[2], this.completion[3]],
            'playtime': this.playtime
        });
            
        }
    }
}