class TrashGame extends Phaser.Scene {
    constructor() {
        super("trashGame");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
        this.level = data.level || 1;
        // Speed of garbage dropping
        this.map = [{
            speed: 150,
            count: 5,
            backScene: 'kitchen',
        }, {
            speed: 300,
            count: 8,
            backScene: 'livingRoom'
        }, {
            speed: 450,
            count: 11,
            backScene: 'bedroom1'
        }, {
            speed: 600,
            count: 4,
            backScene: 'bedroom2'
        }]
        this.speed = this.map[data.level - 1]?.speed; 
        this.backScene = this.map[data.level - 1]?.backScene;
  

    }

    preload() {}

    create() {
        var background = this.add.image(game.config.width / 2, game.config.height/2, "trashBG");
        background.setScale(5);

        this.trashCount = 5;
        if (this.level != 1) {
            // Acceleration Tips
            this.add.text(150, 30, "Now, the speed is faster!")
        }

        this.trashCount = this.map[this.level - 1]?.count;
        
        this.add.text(200, 125, "Use Arrow Keys to move trash can");
        this.add.text(150, 175, "Catch trash until the trash can is full!");
   
        // Score
        // this.score = 5;
        // this.scoreText = this.add.text(70, 30, 'Score' + this.score)
        // Countdown to 30 seconds to exit
        // var countDown = this.add.text(30, 30, 30)
        // let i = 30;
        // this.timer = this.time.addEvent({
        //     delay: 1000,
        //     loop: true,
        //     callback: () => {
        //         // Reset the countdown text
        //         countDown.setText(--i);
        //         if (i === 0) {
        //             console.log(this.score)
        //             this.scene.start("kitchen", { 'posX': this.lastPosX, 'posY': this.lastPosY,
        //             'completion': [this.completion[0], this.completion[1], 1, this.completion[3]] });
        //         }
        //     }
        // })

        // Generate trash cans
        this.trash = this.physics.add.sprite(0, 0, "trash");
        this.trash.setRandomPosition(200, 600, 400, 0);
        this.trash.setScale(0.3);
        this.trash.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.exploadGroup = this.physics.add.group();

        this.time.addEvent({
            delay: 2000,
            repeat: -1,
            callback: () => {
                let x = Phaser.Math.Between(30, 800);
                let y = Phaser.Math.Between(10, 20);
                let single = this.exploadGroup.create(x, y, 'garbage');
                single.setScale(0.05);
                single.setVelocityY(this.speed);
                this.physics.add.overlap(this.trash, single, this.pushTrash, undefined, this)

                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.exploadGroup.killAndHide(single)
                    }
                })
            }
        })
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Left and right moving trash cans
        this.trash.setVelocity(0);
        if (this.cursorKeys.left.isDown) {
            this.trash.setVelocityX(-gameSettings.playerSpeed * 2);
        } else if (this.cursorKeys.right.isDown) {
            this.trash.setVelocityX(gameSettings.playerSpeed * 2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start(this.backScene, {
                'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [this.completion[0], this.completion[1], 1, this.completion[3]]
            });
        }
    }

    pushTrash(trash, single) {
        // this.exploadGroup.killAndHide(single)
        // this.physics.world.disableBody(single.body)

        // Catch one +10 points
        single.disableBody(true, true);
        this.trashCount--;
        if (this.trashCount <= 0) {
            this.scene.start(this.backScene, {
                'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [this.completion[0], this.completion[1], 1, this.completion[3]]
            });
        }
        // this.score += 10;
        // this.scoreText.setText('Score' + this.score)
    }
}