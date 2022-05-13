class kitchenCompletion extends Phaser.Scene {
    constructor () {
        super('kitchenCompletion');
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

        var text_title1 = this.add.text(centerX - 150, 150, "Kitchen Complete", text_style);
        var text_title2 = this.add.text(centerX - 150, 250, "Score : placeholdder", text_style);
        var text_title3 = this.add.text(
            centerX - 150, 350,
            `You used a total of${this.playtime}time,Congratulations on the completion of all tasks,please go to next level`,
        )
        var text_start = this.add.text(300, 600, 'Level Select', text_style);
        text_start.setInteractive();
        text_start.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('levelSelect')
        }, this);

    }
}