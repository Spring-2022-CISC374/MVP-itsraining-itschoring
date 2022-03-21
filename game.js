var gameSettings = {
    playerSpeed: 200
}

var config = {
    width: 1080,
    height: 640,
    backgroundColor: "black",
    scene: [Scene1, Scene2],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);