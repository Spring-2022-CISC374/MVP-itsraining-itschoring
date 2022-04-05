var gameSettings = {
    playerSpeed: 200,
    maxPowerups: 12,
    powerUpVel: 50,
  }
  
  var config = {
    width: 600,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, Scene3],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false
      }
    }
  }
  
  
  var game = new Phaser.Game(config);