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
    }
}