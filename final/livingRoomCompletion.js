class livingRoomCompletion extends Phaser.Scene {
    constructor () {
        super('livingRoomCompletion');
    }
    
    init(data) {
        this.playtime = data.playtime || 0;
    }


    preload () {}

    create () {
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;

        var text_title1 = this.add.text(centerX - 150, 150, "Living Room Complete", text_style);

        if (this.playtime > 0 && this.playtime < 200) {
            gameSettings.livingRoomScore = 10000 - 50*this.playtime;
        } else {
            gameSettings.livingRoomScore = 0;
        }

        var text_title2 = this.add.text(centerX - 150, 250, "Score: " + gameSettings.livingRoomScore, text_style);
        // var text_title3 = this.add.text(
        //     centerX - 150, 350,
        //     `You used a total of ${this.playtime} Seconds ,Congratulations !`,
        // )
        var text_start = this.add.text(300, 600, 'Level Select', text_style);
        text_start.setInteractive();
        text_start.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('levelSelect')
        }, this);

    }
}