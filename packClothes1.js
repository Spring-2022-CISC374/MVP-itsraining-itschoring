class PackClothes1 extends Phaser.Scene {
    constructor() {
        super("PackClothes1");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
        this.completion = data.completion;
        this.level = data.level || 3;
        this.playtime = data.playtime || 0;
        this.map = [{
            count: 1,
            backScene: 'kitchen',
        }, {
            count: 1,
            backScene: 'livingRoom'
        }, {
            count: 4,
            backScene: 'bedroom1'
        }, {
            count: 4,
            backScene: 'bedroom2'
        }]
    }

    preload() {
        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //     console.log(pointer, 'pointer')
        //     console.log(gameObject, 'gameObject')
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        // })
    }

    create() {
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.playtime++
            }
        })
        // initial grow of flower
        this.flower_time = 0;  // grow time
        // time
        var timeText = this.add.text(30, 30, this.flower_time);
        this.timer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                timeText.setText(++this.flower_time);
            }
        })

        // 1
        var centerX = this.physics.world.bounds.centerX;
        var centerY = this.physics.world.bounds.centerY;
        this.index = 1;
        this.closet = this.physics.add.image(centerX, centerY, "closet");
        this.closet.setScale(0.5)

        let dropTotal = [];

        const dropCount = this.map[this.level - 1]?.count;
        const backScene = this.map[this.level - 1]?.backScene;
        const _this = this;

        // create clothes
        for (let i = 1; i <= 4; i++) {
            this['clothes' + i] = this.physics.add.sprite(80 * i, 100, "clothes" + i).setInteractive({ draggable: true });
            this['clothes' + i].setScale(0.2);
            this['clothes' + i].depth = 2;
            this['clothes' + i].setDrag(100, 50)

            // drag
            this['clothes' + i].on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
                if (dragX >= 298 && dragX <= 506 && dragY >= 217 && dragY <= 489) {
                    if (dropTotal.indexOf(i) == -1) {
                        if (dropTotal.length >= dropCount - 1) {
                            return _this.scene.start(backScene, {
                                'posX': _this.lastPosX, 'posY': _this.lastPosY,
                                'completion': [_this.completion[0], 1, _this.completion[2], _this.completion[3]],
                                'playtime': _this.playtime
                            });
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

        // Exit
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var text_title1 = this.add.text(530, 580, "Exit", text_style);
        text_title1.setInteractive();
        text_title1.on('pointerdown', function (pointer) {
            this.scene.start(backScene, {
                'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [this.completion[0], this.completion[1], this.completion[2], 1],
                'playtime': this.playtime
            })
        }, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    onDragStart() {
        console.log(111)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("kitchen", {
                'posX': this.lastPosX, 'posY': this.lastPosY,
                'completion': [this.completion[0], this.completion[1], this.completion[2], 1],
                'playtime': this.playtime
            });
        }

    }

}