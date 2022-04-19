class Sflower extends Phaser.Scene {
    constructor() {
        super("Sflower");
    }

    init(data) {
        this.lastPosX = data.posX;
        this.lastPosY = data.posY;
    }

    preload() {
        this.load.image("flower1", "assets/01.png");
        this.load.image("flower2", "assets/02.png");
        this.load.image("flower3", "assets/03.png");
        this.load.image("flower4", "assets/final.png");
        this.load.image("watering", "assets/watering.png");
    }
    create() {
        // //text
        // var text_style = {
        //     font: 'bold 32px Arial',
        //     color: '#fff'
        // }
        // var centerX = this.physics.world.bounds.centerX;
        // var text_title1 = this.add.text(centerX - 100, 150, "Click on the kettle!!!", text_style);
        // //text
        // 鲜花初成长
        this.flower_time = 0;  // 鲜花成长时间
        // 时间：从0每秒递增
        var timeText = this.add.text(30, 30, this.flower_time);
        this.timer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                timeText.setText(++this.flower_time);
            }
        })

        // 设置花（第一阶段）
        this.index = 1;
        this._flower = this.physics.add.image(0, 0, "flower1");
        this.setFlower(this._flower, this.index)

        // 设置浇水器
        var watering = this.physics.add.image(0, 0, "watering");
        watering.setScale(0.1);
        watering.setPosition(400, 400);
        watering.setImmovable(true);

        // 浇花
        watering.setInteractive().on('pointerdown', function (pointer) {
            var _index = 0;
            // 判断当前倒计时
            if (this.flower_time >= 3 && this.flower_time <= 5) {
                _index = 2
            } else if (this.flower_time >= 6 && this.flower_time <= 8) {
                _index = 3
            } else if (this.flower_time > 10) {
                _index = 4
            }

            if (_index > this.index) {
                this._flower.disableBody(true, true);  // 清除原有的花
                this._flower = this.physics.add.image(0, 0, "flower" + _index)
                this.setFlower(this._flower, _index)
            }
        }, this)
            //text
        var text_style = {
            font: 'bold 32px Arial',
            color: '#fff'
        }
        var centerX = this.physics.world.bounds.centerX;
        var text_title1 = this.add.text(centerX - 100, 150, "Click on the kettle!!!", text_style);
        //text
    }
    

    setFlower(flower, index) {
        flower.setScale(0.5);
        flower.setPosition(300, 430);
        flower.setImmovable(true);
        this.physics.add.collider(flower, this.player);
        if (index === 4) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start("Scene2", { 'posX': this.lastPosX, 'posY': this.lastPosY });
                }
            })
        }
    }
  
  
}