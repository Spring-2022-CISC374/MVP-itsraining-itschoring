
var config = {
    width: 3000,
    height: 1000,
    backgroundColor: "0x000000",
    scene:[Scene1,Scene2],
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



