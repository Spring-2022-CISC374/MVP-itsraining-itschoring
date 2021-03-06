class Sflower extends Phaser.Scene {
    constructor() {
        super("Sflower");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
        this.level = data.level || 1;
        this.playtime = data.playtime || 0;
        this.map = [{
            count: 3,
            backScene: 'kitchen',
        }, {
            count: 7,
            backScene: 'livingRoom'
        }, {
            count: 7,
            backScene: 'bedroom1'
        }, {
            count: 10,
            backScene: 'bedroom2'
        }]
    }

    preload() { }

    create() {
        const dropCount = this.map[this.level - 1]?.count;
        this.backScene = this.map[this.level - 1]?.backScene;
        if (this.level === 1) {
            var background = this.add.image(game.config.width/2, game.config.height/2, "flowerBG1");
            background.setScale(6);
        } else if (this.level === 2) {
            var background = this.add.image(game.config.width/2, game.config.height/2, "flowerBG2");
            background.setScale(6);
        }

        // //text
        // var text_style = {
        //     font: 'bold 32px Arial',
        //     color: '#fff'
        // }
        // var centerX = this.physics.world.bounds.centerX;
        // var text_title1 = this.add.text(centerX - 100, 150, "Click on the kettle!!!", text_style);

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.playtime++
            }
        })

        // initial grow of flower
        // this.flower_time = 0;  // grow time
        // time
        // var timeText = this.add.text(30, 30, this.flower_time);
        // this.timer = this.time.addEvent({
        //     delay: 1000,
        //     loop: true,
        //     callback: () => {
        //         timeText.setText(++this.flower_time);
        //     }
        // })

        // 1
        this.index = 1;
        this._flower = this.physics.add.image(0, 0, "flower1");
        this.setFlower(this._flower, this.index)

        // instruction
        this.flowerText = this.add.text(450, 350, "Drag water drops to the flower");
        this.flowerText2 = this.add.text(450, 375, "to help it grow");
        let dropTotal = [];

        
        const _this = this;

        // water drop
        for (let i = 0; i < 20; i++) {
            this['waterdrop' + i] = this.add.sprite(50 * (i + 1), 100, "waterdrop").setInteractive({ draggable: true });
            this['waterdrop' + i].setScale(0.3);
            this['waterdrop' + i].depth = 2;
            // drag water drop
            this['waterdrop' + i].on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
                if (dragX >= 300 && dragX <= 380 && dragY >= 380 && dragY <= 500) {
                    if (dropTotal.indexOf(i) == -1) {
                        if (dropTotal.length >= dropCount - 1) {
                            _this.scene.start(_this.backScene, {
                                'posX': _this.lastPosX, 'posY': _this.lastPosY,
                                'completion': [_this.completion[0], _this.completion[1], _this.completion[2], 1],
                                'playtime': _this.playtime
                            });
                            return;
                        }
                        dropTotal.push(i)
                    }
                } else {
                    const idx = dropTotal.findIndex(item => item == i)
                    if (idx > -1) {
                        dropTotal.splice(idx, 1)
                    }
                }
            })
        }

        // watering
        // var watering = this.physics.add.image(0, 0, "watering");
        // watering.setScale(0.1);
        // watering.setPosition(400, 400);
        // watering.setImmovable(true);

        // // watering
        // watering.setInteractive().on('pointerdown', function (pointer) {
        //     var _index = 0;
        //     // timmer
        //     if (this.flower_time >= 3 && this.flower_time <= 5) {
        //         _index = 2
        //     } else if (this.flower_time >= 6 && this.flower_time <= 8) {
        //         _index = 3
        //     } else if (this.flower_time > 10) {
        //         _index = 4
        //     }

        //     if (_index > this.index) {
        //         this._flower.disableBody(true, true);  // ??????????????????
        //         this._flower = this.physics.add.image(0, 0, "flower" + _index)
        //         this.setFlower(this._flower, _index)
        //     }
        // }, this)

        // Exit
        // var text_style = {
        //     font: 'bold 32px Arial',
        //     color: '#fff'
        // }
        // var text_title1 = this.add.text(430, 480, "Exit", text_style);
        // text_title1.setInteractive();
        // text_title1.on('pointerdown', function (pointer) {
        //     this.scene.start('kitchen', {
        //         'posX': this.lastPosX, 'posY': this.lastPosY,
        //         'completion': [this.completion[0], this.completion[1], this.completion[2], 1],
        //         'playtime': this.playtime
        //     })
        // }, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    onDragStart() {
        console.log(111)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start(this.backScene, {
                'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [this.completion[0], this.completion[1], this.completion[2], 1],
                'playtime': this.playtime
            });
        }

    }

    setFlower(flower, index) {
        flower.setScale(0.8);
        flower.setPosition(350, 450);  // 330, 430
        flower.setImmovable(true);
        this.physics.add.collider(flower, this.player);
        if (index === 4) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start("kitchen", {
                        'posX': this.lastPosX, 'posY': this.lastPosY,
                        'completion': [this.completion[0], this.completion[1], this.completion[2], 1],
                        'playtime': this.playtime
                    });
                }
            })
        }
    }


}