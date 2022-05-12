var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 800,
    height: 700,
    type: Phaser.AUTO,
    backgroundColor: "0x333333",
    scene:[mainMenu, levelSelect, kitchen, kitchenCompletion, livingRoom, bedroom1, bedroom2, dishWashing, dogFeeding, TrashGame, Sflower, makeBed1, makeBed2, bookSorting, bookSortingv2, vacuuming, PackClothes],
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



