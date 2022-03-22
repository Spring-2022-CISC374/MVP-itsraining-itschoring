class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame"); // super ()inherit all the characteristit from phaser
    }
    
    create(){
        this.background=this.add.image(200,-20,"background");
       // this.background=this.add.tileSprite(0,0,config.width,config.height,"background");//backgound dynamic 
        this.background.setOrigin(0,0);

     

      
        
        this.add.text(20,20, "Playing game", {
            front: "95px Arial",
            fill:"yellow"
        });
    }
    
    

    //update(){
        //this.moveShip(this.ship1,1);
        //this.moveShip(this.ship2,2);
        //this.moveShip(this.ship3,3);

        //this.background.tilePositionY-=0.5; //backgound dynamic 
   // }

    //moveShip(ship,speed){
      //  ship.y+=speed;

       // if(ship.y>config.height){
            //this.resetShipPos(ship);
        //}
   // }

   // resetShipPos(ship){
        //ship.y=0;
        //var randomX=Phaser.Math.Between(0,config.width);
       // ship.x= randomX;

    //}

}