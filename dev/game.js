var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: "0x333333",
    scene:[Scene0,Scene1,Scene2,Scene3,Scene4],
    pixelArt:true,
    physics: {
        default: 'arcade',
            arcade: {
            // gravity: {
            //     y: 200
            // },
                debug: false
            }
    }

}

//window.onload = function(){
    var game = new Phaser.Game(config);



