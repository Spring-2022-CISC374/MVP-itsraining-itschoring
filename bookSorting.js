class bookSorting extends Phaser.Scene{
    constructor(){
        super("bookSorting");
    }

    init(data){
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
    }

    preload(){}
    
    create(){
        this.bookCount = 4;
        this.redbook = this.add.image(0, 0, "redbook");
        this.yellowbook = this.add.image(0, 0, "yellowbook");
        this.greenbook = this.add.image(0, 0, "greenbook");
        this.bluebook = this.add.image(0, 0, "bluebook");

        this.yellowbook.setPosition(250, 250);
        this.redbook.setPosition(250, 500);
        this.bluebook.setPosition(500, 250);
        this.greenbook.setPosition(500, 500);

        this.redbook.setScale(1.3);
        this.yellowbook.setScale(1.3);
        this.greenbook.setScale(1.3);
        this.bluebook.setScale(1.3);
    
        this.redbook.setInteractive();
        this.yellowbook.setInteractive();
        this.greenbook.setInteractive();
        this.bluebook.setInteractive();
        this.input.on('gameobjectdown', this.removeBook, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(200, 100, "Sort in order: red, yellow, green, blue");
    }

    removeBook(pointer, gameObject) {
        if (gameObject === this.redbook && this.bookCount === 4) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.yellowbook && this.bookCount === 3) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.greenbook && this.bookCount === 2) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (gameObject === this.bluebook && this.bookCount === 1) {
            gameObject.destroy();
            this.bookCount--;
        }
        if (this.bookCount <= 0) {
            this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("livingRoom", {'posX': this.lastPosX, 'posY': this.lastPosY});
        }
    }
}