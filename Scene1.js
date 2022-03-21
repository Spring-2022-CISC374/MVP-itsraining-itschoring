class Scene1 extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
        this.load.image("player", "assets/gato.png");
        this.load.image("wall", "assets/wall.png");
    }

    create() {
        this.add.text(20, 20, "Loading...");
        this.scene.start("mainGame");
    }
}