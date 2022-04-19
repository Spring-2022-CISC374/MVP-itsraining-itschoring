var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 800,
    height: 700,
    type: Phaser.AUTO,
    backgroundColor: "0x333333",
    scene:[Scene0,Scene1,Scene2,Scene3,Scene4,Sgarbage, TrashGame, Sflower],
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



