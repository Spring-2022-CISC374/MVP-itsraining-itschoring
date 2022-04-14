class Scene0 extends Phaser.Scene {
    constructor () {
        super('Scene0');
    }

    preload () {}

    create () {
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;

        var text_title1 = this.add.text(centerX - 100, 150, "It's Raining", text_style);
        var text_title2 = this.add.text(centerX - 100, 250, "It's Choring", text_style);

        var text_start = this.add.text(100, 600, 'Start', text_style);
        text_start.setInteractive();
        text_start.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('Scene1')
        }, this);

        var text_exit = this.add.text(600, 600, 'Exit', text_style);
        text_exit.setInteractive();
        text_exit.on('pointerdown', function (pointer) {
            // exit game
            this.scene.stop('Scene0')
        });
    }
}