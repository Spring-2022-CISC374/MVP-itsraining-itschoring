class levelSelect extends Phaser.Scene {
    constructor() {
        super('levelSelect')
    }
    preload(){}

    create() {
        var centerX = this.physics.world.bounds.centerX;


        for (let i = 1; i <= 4; i++) {
            if (i === 1) {
                this.add.text(centerX - 75, 125, "Kitchen", {
                    font: 'bold 32px Arial',
                    color: '#fff'
                }).setInteractive().on('pointerdown', function (pointer) {
                    // level => Jump to the next scene
                    this.scene.start('kitchen', { 'posX': 300, 'posY': 500, 'completion': [0,0,0,0] });
                }, this);
                this.add.text(centerX + 75, 125, "Score: " + gameSettings.kitchenScore, {
                    font: 'bold 24px Arial',
                    color: '#fff'
                });
            } else if (i === 2) {
                this.add.text(centerX - 75, 250, "Living Room", {
                    font: 'bold 32px Arial',
                    color: '#fff'
                }).setInteractive().on('pointerdown', function (pointer) {
                    // level => Jump to the next scene
                    this.scene.start('livingRoom', { 'posX': 300, 'posY': 430 ,'completion': [0,0,0,0]});
                }, this);
                this.add.text(centerX + 150, 250, "Score: " + gameSettings.livingRoomScore, {
                    font: 'bold 24px Arial',
                    color: '#fff'
                });
            } else if (i === 3) {
                this.add.text(centerX - 75, 375, "Bedroom 1", {
                    font: 'bold 32px Arial',
                    color: '#fff'
                }).setInteractive().on('pointerdown', function (pointer) {
                    // level => Jump to the next scene
                    this.scene.start('bedroom1', { 'posX': 650, 'posY': 240,'completion': [0,0,0,0] });
                }, this);
                this.add.text(centerX + 125, 375, "Score: " + gameSettings.bedroom1Score, {
                    font: 'bold 24px Arial',
                    color: '#fff'
                });
            } else if (i === 4) {
                this.add.text(centerX - 75, 500, "Bedroom 2", {
                    font: 'bold 32px Arial',
                    color: '#fff'
                }).setInteractive().on('pointerdown', function (pointer) {
                    // level => Jump to the next scene
                    this.scene.start('bedroom2', {'posX': 120, 'posY': 250 ,'completion': [0,0,0,1]});
                }, this);
                this.add.text(centerX + 125, 500, "Score: " + gameSettings.bedroom2Score, {
                    font: 'bold 24px Arial',
                    color: '#fff'
                });
            }
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