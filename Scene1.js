class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1')
    }

    create() {
        var centerX = this.physics.world.bounds.centerX;

        for (var i = 1; i <= 4; i++) {
            this.add.text(centerX - 75, 150*i, 'level ' + i, {
                font: 'bold 32px Arial',
                color: '#fff'
            }).setInteractive().on('pointerdown', function (pointer) {
                // level => Jump to the next scene
                this.scene.start('Scene2', {'posX': 300, 'posY': 500});
            }, this);
        }
        // adding exit to level page
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;
        var text_exit = this.add.text(600, 700, 'Exit', text_style);
        text_exit.setInteractive();
        text_exit.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('Scene0')
        }, this);

    }
}