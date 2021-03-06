class livingRoom extends Phaser.Scene{
  constructor(){
      super("livingRoom");
  }

  init(data){
      this.lastPosX = data.posX;
      this.lastPosY = data.posY;
      this.completion = data.completion;
      this.playtime = data.playtime || 0;
  }

  preload(){}
  
  create(){
      console.log(this.completion[0], this.completion[1], this.completion[2], this.completion[3])

      if(this.completion[0] == 1 && this.completion[1] == 1 && this.completion[2] == 1 && this.completion[3] == 1){
       // console.log("done")
        this.scene.start('livingRoomCompletion',{
          'playtime': this.playtime
        })
      }

      var background = this.add.image(0, 0, "livingRoomBG");
      background.scale = 1.52;
      background.setOrigin(0, 0);

      this.walls = this.physics.add.group();
      var counter = this.physics.add.image(0, 0, "counter");
      var sinkFridge = this.physics.add.image(0, 0, "sinkFridge");
      var leftWall = this.physics.add.image(0, 0, "leftWall");
      var right = this.physics.add.image(0, 0, "right");
      var bottom = this.physics.add.image(0, 0, "bottom");
      var table = this.physics.add.image(0, 0, "table");
      var couchBarrier = this.physics.add.image(0, 0, "couchBarrier");
      var chairBarrierR = this.physics.add.image(0, 0, "chairBarrier");
      var chairBarrierL = this.physics.add.image(0, 0, "chairBarrier");
      //this.walls.add(counter);
      this.walls.add(sinkFridge);
      this.walls.add(leftWall);
      //this.walls.add(right);
      this.walls.add(bottom);
      this.walls.add(couchBarrier);
      this.walls.add(chairBarrierR);
      this.walls.add(chairBarrierL);
      //this.walls.add(table);
      counter.setImmovable(true);
      sinkFridge.setImmovable(true);
      leftWall.setImmovable(true);
      right.setImmovable(true);
      bottom.setImmovable(true);
      table.setImmovable(true);
      couchBarrier.setImmovable(true);
      chairBarrierR.setImmovable(true);
      chairBarrierL.setImmovable(true);
      counter.setPosition(678, 303);
      sinkFridge.setPosition(450, 65);
      leftWall.setPosition(20, 65);
      right.setPosition(742, 200);
      bottom.setPosition(500, 520);
      table.setPosition(195, 312);
      couchBarrier.setPosition(390, 290);
      chairBarrierL.setPosition(245, 220);
      chairBarrierR.setPosition(535, 220);

      if(this.completion[3] == 0){
        // watering arrow
        var flowerArrow = this.add.image(0, 0, "arrow");
        flowerArrow.setPosition(42, 330);
        
        // flower mini game
        flowerArrow.setInteractive().on('pointerdown', function (pointer) {
            // ppl moving area
            var x = this.player.body.position.x;
            var y = this.player.body.position.y;
          
            if ((x < 100) && (y < 450 && y > 250)) {
                /*this.scene.start("Sflower", {
                    'posX': x + 27.8,
                    'posY': y + 44.45
                })*/
                this.scene.start("Sflower", {
                  'posX': x + 64,
                  'posY': y + 64,
                  'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                  'level': 2,
                  'playtime': this.playtime
              })
               // console.log("start minigame")
            }
        }, this)
      }else {
        // finsih flowering 
        var flowerFinish = this.add.image(0, 0, "green");
        flowerFinish.setPosition(42, 330);
        flowerFinish.setScale(0.06);
      }


      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();

      if(this.completion[1] == 0){
        var bookArrow = this.add.image(0, 0, "arrow");
        bookArrow.setPosition(622, 70);
        bookArrow.setInteractive().on('pointerdown', function (pointer) {
        if(this.player.body.position.x > 525 && this.player.body.position.y < 165 && this.player.body.position.x < 660){
              this.scene.start("bookSorting", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64,
              'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
              'playtime': this.playtime,
            
            });
          }
        }, this);
      }else {
        // finish sorting 
        var bookFinish = this.add.image(0, 0, "green");
        bookFinish.setPosition(622, 70);
        bookFinish.setScale(0.06);
      }

      if(this.completion[0] == 0){

        var carpetArrow = this.add.image(0, 0, "arrow");
        carpetArrow.setPosition(390, 250);
        carpetArrow.setInteractive().on('pointerdown', function (pointer) {
          if(this.player.body.position.x > 270 && this.player.body.position.x < 450 && this.player.body.position.y < 230 && this.player.body.position.y > 150){
              this.scene.start("vacuuming", {'posX': this.player.body.position.x + 64, 'posY': this.player.body.position.y + 64,
              'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
              'playtime': this.playtime,
            });
          }
        }, this);
      }else {
        // finsih 
        var carpetFinish = this.add.image(0, 0, "green");
        carpetFinish.setPosition(390, 250);
        carpetFinish.setScale(0.06);

      }
      //add exit to room page - back to level page and exit
      var text_style = {
          font: 'bold 32px Arial',
          color: '#fff'
      }

      var text_time = this.add.text(100, 600, `Time: ${this.playtime}`, text_style);
      this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          text_time.setText(`Time: ${++this.playtime}`)
        }
      })

      // var text_reset = this.add.text(120, 640, 'Reset', text_style);
      // text_reset.setInteractive();
      // text_reset.on('pointerdown', function (pointer) {
      //   this.scene.start('livingRoom', { 'posX': 300, 'posY': 430, 'completion': [0,0,0,0] });
      // }, this);


      //var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(300, 600, 'Back to level', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('levelSelect')
      }, this);

      var centerX = this.physics.world.bounds.centerX;
      var text_exit = this.add.text(600, 600, 'Exit', text_style);
      text_exit.setInteractive();
      text_exit.on('pointerdown', function (pointer) {
          // start => move to the next screen
          this.scene.start('mainMenu')
      }, this);

      this.physics.add.collider(this.walls, this.player);

      this.add.text(30, 570, "Use Arrow Keys to move, click on orange arrow while nearby to start minigame");
       //load trash can 
       var trash = this.physics.add.image(0, 0, "trash");
       trash.setPosition(600, 340); // 400 310
       trash.setScale(0.2);
       trash.setImmovable(true);

       // arrow icon for trash can 
       if (this.completion[2] == 0) {
           var trashArrow = this.add.image(0, 0, "arrow");
           trashArrow.setPosition(600, 300);
           // Arrow click event => enter trash pickup mini-game scene

           trashArrow.setInteractive().on('pointerdown', function (pointer) {
               // Limit the character to a certain range of the trash can to click to trigger
               var x = this.player.body.position.x;
               var y = this.player.body.position.y;
               if ((x > 450 && x < 650) && (y < 400 && y > 200)) {
                   this.scene.start("trashGame", {
                       'posX': x + 64,
                       'posY': y + 64,
                       'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                       'level': 2,
                       'playtime': this.playtime,
                   })
               }
           }, this)
      } else {
        // finsih 
        var trashFinish = this.add.image(0, 0, "green");
        trashFinish.setPosition(600, 300);
        trashFinish.setScale(0.06);
      }   
  }

  update(){
      this.movePlayerManager();
  }

  movePlayerManager(){

    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
      this.player.play("walkLeftAnim", true);
    } else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
      this.player.play("walkRightAnim", true);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
      this.player.play("walkUpAnim", true);
    } else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
      this.player.play("walkDownAnim", true);
    }

    if(this.cursorKeys.up.isUp && this.cursorKeys.down.isUp && this.cursorKeys.left.isUp && this.cursorKeys.right.isUp) {
        this.player.setTexture("player");
    }
  }
}