class Sgarbage extends Phaser.Scene {
    constructor() {
        super('Sgarbage');
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
    }

    preload() {
        this.load.image("background", "assets/room4.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("player", "assets/chracter1.png");
        this.load.image("trash", "assets/trash-icon.jpg");
        this.load.image("counter", "assets/counter.png");
        this.load.image("sinkFridge", "assets/sinkFridge.png");
        this.load.image("leftWall", "assets/leftWall.png");
        this.load.image("right", "assets/right.png");
        this.load.image("bottom", "assets/bottom.png");
        this.load.image("table", "assets/table.png");
    }

    create() {
        // Loading Scenes
        var background = this.add.image(0, 0, "background");
        background.scale = 1.65;
        background.setOrigin(0, 0);

        // Batch processing
        this.walls = this.physics.add.group();
        var counter = this.physics.add.image(0, 0, "counter");
        var sinkFridge = this.physics.add.image(0, 0, "sinkFridge");
        var leftWall = this.physics.add.image(0, 0, "leftWall");
        var right = this.physics.add.image(0, 0, "right");
        var bottom = this.physics.add.image(0, 0, "bottom");
        var table = this.physics.add.image(0, 0, "table");
        this.walls.add(counter);
        this.walls.add(sinkFridge);
        this.walls.add(leftWall);
        this.walls.add(right);
        this.walls.add(bottom);
        this.walls.add(table);
        counter.setImmovable(true);
        sinkFridge.setImmovable(true);
        leftWall.setImmovable(true);
        right.setImmovable(true);
        bottom.setImmovable(true);
        table.setImmovable(true);
        counter.setPosition(678, 303);
        sinkFridge.setPosition(640, 120);
        leftWall.setPosition(20, 65);
        right.setPosition(742, 200);
        bottom.setPosition(500, 565);
        table.setPosition(195, 312);

        // Loading trash cans
        var trash = this.physics.add.image(0, 0, "trash");
        trash.setPosition(450, 340); // 400 310
        trash.setScale(0.065);
        trash.setImmovable(true);

        // create character
        this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
        this.player.setScale(0.1);
        this.player.setCollideWorldBounds(true);  // Settings collide with the edge of the world

        // Generate collision, overlap management objects
        this.physics.add.collider(this.walls, this.player);
        this.physics.add.collider(trash, this.player);

        // input generates input management objects (keyboard movement)
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        // Trash can arrow
        var trashArrow = this.add.image(0, 0, "arrow");
        trashArrow.setPosition(450, 300);
        // Arrow click event => enter the garbage collection mini-game scene
        trashArrow.setInteractive().on('pointerdown', function (pointer) {
            // Limit the character to a certain range of the trash can to click to trigger
            var x = this.player.body.position.x;
            var y = this.player.body.position.y;
            if ((x > 400 && x < 500) && (y < 400 && y > 250)) {
                this.scene.start("TrashGame", {
                    'posX': x + 27.8,
                    'posY': y + 44.45
                })
            }
        }, this)

      

        // Return to level
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var text_back = this.add.text(300, 700, 'Back to level', text_style);
        text_back.setInteractive();
        text_back.on('pointerdown', function (pointer) {
            this.scene.start('Scene1')
        }, this);
        // Back to home page
        var text_exit = this.add.text(600, 700, 'Exit', text_style);
        text_exit.setInteractive();
        text_exit.on('pointerdown', function (pointer) {
            this.scene.start('Scene0')
        }, this);
    }

    update() {
        // Character movement
        this.player.setVelocity(0);
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        } else if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }
}