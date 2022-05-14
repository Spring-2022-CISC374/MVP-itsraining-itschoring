class bedroom2 extends Phaser.Scene{
  constructor(){
      super("bedroom2");
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
        console.log("done")
        this.scene.start('bedroom2Completion',{
          'playtime': this.playtime
        })
      }

      var background = this.add.image(0, 0, "bedroom2BG");
      background.scale = 1.67;
      background.setOrigin(0, 0);

      this.walls = this.physics.add.group();
      var counter = this.physics.add.image(0, 0, "counter");
      var sinkFridge = this.physics.add.image(0, 0, "sinkFridge");
      var leftWall = this.physics.add.image(0, 0, "leftWall");
      var right = this.physics.add.image(0, 0, "right");
      var bottom = this.physics.add.image(0, 0, "bottom");
      var table = this.physics.add.image(0, 0, "table");
      this.walls.add(counter);
      this.walls.add(sinkFridge);
      this.walls.add(leftWall);
      this.walls.add(right);
      this.walls.add(bottom);
      this.walls.add(table);
      counter.setImmovable(true);
      sinkFridge.setImmovable(true);
      leftWall.setImmovable(true);
      right.setImmovable(true);
      bottom.setImmovable(true);
      table.setImmovable(true);
      counter.setPosition(740, 200);
      sinkFridge.setPosition(500, 120);
      leftWall.setPosition(20, 65);
      right.setPosition(30, 200);
      bottom.setPosition(500, 565);
      table.setPosition(150, 350);

      if(this.completion[2] == 0){
        //load trash can 
        var trash = this.physics.add.image(0, 0, "trash");
        trash.setPosition(450, 250); // 400 310
        trash.setScale(0.2);
        trash.setImmovable(true);

        // arrow icon for trash can 
        var trashArrow = this.add.image(0, 0, "arrow");
        trashArrow.setPosition(450, 200);
        // Arrow click event => enter trash pickup mini-game scene

        trashArrow.setInteractive().on('pointerdown', function (pointer) {
            // Limit the character to a certain range of the trash can to click to trigger
            var x = this.player.body.position.x;
              var y = this.player.body.position.y;
              if ((x > 310 && x < 440) && (y < 250)) {
                  this.scene.start("trashGame", {
                      'posX': x + 64,
                      'posY': y + 64,
                      'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                      'level': 4,
                      'playtime': this.playtime
                      
                  })
              }
          }, this)
      }else {
        // finsih 
        var trashFinish = this.add.image(0, 0, "green");
        trashFinish.setPosition(450, 200);
        trashFinish.setScale(0.06);
      }

      if(this.completion[0] == 0){
        var bedArrow = this.add.image(0, 0, "arrow");
        bedArrow.setPosition(150, 330);
        
        // bed mini game
        bedArrow.setInteractive().on('pointerdown', function (pointer) {
            // ppl moving area
            var x = this.player.body.position.x;
            var y = this.player.body.position.y;
          
            if ((x < 230) && (y < 420 && y > 200)) {
                console.log("bed")
                this.scene.start("makeBed2", {
                    'posX': x + 27.8,
                    'posY': y + 44.45,
                    'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                    'playtime': this.playtime
                })
            }
        }, this)
      }else {
        // finish
        var bedFinish = this.add.image(0, 0, "green");
        bedFinish.setPosition(150, 330);
        bedFinish.setScale(0.06);
      }

      this.player = this.physics.add.sprite(this.lastPosX, this.lastPosY, "player");
      this.player.setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();

      if(this.completion[1] == 0){
        var clothesArrow = this.add.image(0, 0, "arrow");
        clothesArrow.setPosition(670, 390);
        clothesArrow.setInteractive().on('pointerdown', function (pointer) {
          var x = this.player.body.position.x;
          var y = this.player.body.position.y;
        if(this.player.body.position.x > 450 && this.player.body.position.y > 300){
              console.log("clothes");

              
                this.scene.start("PackClothes1", {
                    'posX': x + 64,
                    'posY': y + 64,
                    'completion': [this.completion[0], this.completion[1], this.completion[2], this.completion[3]],
                    'level': 4,
                    'playtime': this.playtime
                })
          }
        }, this);
      }else {
        // finsih
        var clothesFinish = this.add.image(0, 0, "green");
        clothesFinish.setPosition(670, 390);
        clothesFinish.setScale(0.06);
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
      //   this.scene.start('bedroom2', { 'posX': 120, 'posY': 250, 'completion': [0,0,0,1] });
      // }, this);


      var centerX = this.physics.world.bounds.centerX;
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