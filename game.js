var gameSettings = {
    playerSpeed: 200,
    kitchenScore: 0,
    livingRoomScore: 0,
    bedroom1Score: 0,
    bedroom2Score: 0
}

var config = {
    width: 800,
    height: 700,
    type: Phaser.AUTO,
    backgroundColor: "0x333333",
    scene:[mainMenu, levelSelect, kitchen, kitchenCompletion, livingRoom, livingRoomCompletion, bedroom1, bedroom1Completion, bedroom2, bedroom2Completion, dishWashing, dogFeeding, TrashGame, Sflower, makeBed1, makeBed2, bookSorting, bookSortingv2, vacuuming, PackClothes, PackClothes1],
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



