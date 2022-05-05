class levelSelect extends Phaser.Scene {
    constructor() {
        super('levelSelect')
    }

    create() {
        var centerX = this.physics.world.bounds.centerX;

        for (let i = 1; i <= 4; i++) {
            this.add.text(centerX - 75, 125*i, 'level ' + i, {
                font: 'bold 32px Arial',
                color: '#fff'
            }).setInteractive().on('pointerdown', function (pointer) {
                // level => Jump to the next scene
                
                if (i === 1) {
                    this.scene.start('kitchen', { 'posX': 300, 'posY': 500, 'completion': [0,0,0,0] });
                }  else if (i === 2) {
                   this.scene.start('livingRoom', { 'posX': 300, 'posY': 430 });
                } else if (i === 3) {
                    this.scene.start('bedroom1', { 'posX': 300, 'posY': 500 });
                } else if (i === 4) {
                    this.scene.start('bedroom2', {'posX': 300, 'posY': 500 });
                }
            

            }, this);
        }
        // adding exit to level page
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;
        var text_exit = this.add.text(600, 600, 'Exit', text_style);
        text_exit.setInteractive();
        text_exit.on('pointerdown', function (pointer) {
            // start => move to the next screen
            this.scene.start('mainMenu')
        }, this);

           // adding exit to level page
           var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;
        var text_exit = this.add.text(600, 700, 'Exit', text_style);
        text_exit.setInteractive();

    }
}