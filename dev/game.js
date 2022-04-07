
var config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: "0x000000",
    scene:[Scene0,Scene1,Scene2],
    pixelArt:true,
    physics: {
        default: 'arcade',
            arcade: {
            // gravity: {
            //     y: 200
            // },
        debug: true
        }
    }

}

//window.onload = function(){
    var game = new Phaser.Game(config);



