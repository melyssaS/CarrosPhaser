export default class ganador extends Phaser.Scene {


  constructor() {

    super({ key: 'ganador' });



  }



  create() {
    this.cameras.main.backgroundColor.setTo(108, 210, 222);
 
    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('posicion');
    }, this);


  this.socket.on('posiciones',(obj)=>{
    if (obj.pos[0]!=null) {
      this.coche1= this.add.sprite(window.innerWidth / 2+200, window.innerHeight / 2, obj.co[obj.pos[0]-1]);
      this.player1 = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'font', '1.player '+obj.pos[0], 30).setOrigin(0.5).setCenterAlign().setInteractive();
    }
    
    if (obj.pos[1]!=null) {
      this.coche2= this.add.sprite(window.innerWidth / 2+200, 60+window.innerHeight / 2, obj.co[obj.pos[1]-1]);
      this.player2 = this.add.bitmapText(window.innerWidth / 2, 60 + window.innerHeight / 2, 'font', '2.player '+obj.pos[1], 30).setOrigin(0.5).setCenterAlign().setInteractive();
    }

    if (obj.pos[2]!=null) {
      this.coche3= this.add.sprite(window.innerWidth / 2+200, 120+window.innerHeight / 2, obj.co[obj.pos[2]-1]);
      this.player3 = this.add.bitmapText(window.innerWidth / 2,  120 + window.innerHeight / 2, 'font', '3.player '+obj.pos[2], 30).setOrigin(0.5).setCenterAlign().setInteractive();
    }

this.socket.on('finalizar',()=>{
  this.socket.disconnect();
})

  })

  }
  update() { }

}