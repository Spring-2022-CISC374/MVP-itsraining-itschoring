class Scene2 extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        this.add.text(20, 20, "Playing");
        this.walls = this.physics.add.group();
        var wall1 = this.physics.add.image(159, 80, "wall");
        var wall2 = this.physics.add.image(159, 80, "wall");
        var wall3 = this.physics.add.image(159, 80, "wall");
        var wall4 = this.physics.add.image(159, 80, "wall");
        this.walls.add(wall1);
        this.walls.add(wall2);
        this.walls.add(wall3);
        this.walls.add(wall4);
        wall1.setPosition(game.config.width/8, game.config.height/2);
        wall2.setPosition(game.config.width-game.config.width/8, game.config.height/2);
        wall3.setPosition(game.config.width/2, game.config.height/8);
        wall4.setPosition(game.config.width/2, game.config.height-game.config.height/8);
        wall1.setScale(0.5, 2.5);
        wall2.setScale(0.5, 2.5);
        wall3.setScale(2, 0.5);
        wall4.setScale(2, 0.5);
        wall1.setImmovable(true);
        wall2.setImmovable(true);
        wall3.setImmovable(true);
        wall4.setImmovable(true);

        this.player = this.physics.add.image(config.width/2, config.height/2, "player");
        this.player.setScale(0.1);
        this.player.setCollideWorldBounds(true);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.walls, this.player);
    }

    update() {
        this.movePlayerManager();
    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }
    }
}