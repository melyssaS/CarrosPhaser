

export default class eleccion extends Phaser.Scene {

  constructor() {

    super({ key: 'eleccion' });

  }

  init(socket) {
    this.socket = socket;
  }

  create() {

    this.add.image(window.innerWidth / 2, window.innerHeight / 2 ,"fondo2").setScale(2);
    this.coche = [['icarro1','coche11.png','fcarro1'],['icarro2','coche21.png','fcarro2'],['icarro3','coche31.png','fcarro3']];

//this.coche1 = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'icarro1','coche11.png').setInteractive();
    this.coche1 = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, this.coche[0][0]).setInteractive();
    this.coche2 = this.add.sprite(window.innerWidth / 2 - 300, window.innerHeight / 2, this.coche[1][0]).setInteractive();
    this.coche3 = this.add.sprite(window.innerWidth / 2 + 300, window.innerHeight / 2, this.coche[2][0]).setInteractive();



    this.coche1.on('pointerdown', () => {
      this.socket.emit('eleccionReady');
      this.socket.on('borrarImagen', () => {
        
        this.fisica=this.cache.json.get(this.coche[0][2]); 

        this.componentes=[this.coche[0][0],this.coche[0][1], this.fisica.coche11];

        this.socket.emit('enviarImagen',(this.componentes));
        this.coche1.destroy()
        this.coche2.destroy()
        this.coche3.destroy()
        var text = this.add.bitmapText(window.innerWidth / 2, window.innerHeight -100, 'font', 'waiting for the players...', 16).setOrigin(0.5);
   
      })
    },this);

    this.coche2.on('pointerdown', () => {
      this.socket.emit('eleccionReady');
      this.socket.on('borrarImagen', () => {
        this.fisica=this.cache.json.get(this.coche[1][2]);
        this.componentes=[this.coche[1][0],this.coche[1][1], this.fisica.coche21];
        this.socket.emit('enviarImagen',(this.componentes));
        this.coche1.destroy()
        this.coche2.destroy()
        this.coche3.destroy()
        var text = this.add.bitmapText(window.innerWidth / 2, window.innerHeight -100, 'font', 'waiting for the players...', 16).setOrigin(0.5);
    
      })

    },this);

    this.coche3.on('pointerdown', () => {
      this.socket.emit('eleccionReady');
      this.socket.on('borrarImagen', () => {
        this.fisica=this.cache.json.get(this.coche[2][2]);
        this.componentes=[this.coche[2][0],this.coche[2][1], this.fisica.coche31];
        this.socket.emit('enviarImagen',(this.componentes));
        this.coche1.destroy()
        this.coche2.destroy()
        this.coche3.destroy()
          var text = this.add.bitmapText(window.innerWidth / 2, window.innerHeight -100, 'font', 'waiting for the players...', 16).setOrigin(0.5);
        
      },this)

    });



    this.socket.on('cambioEscena',()=>{
      this.scene.start('lugar', this.socket);
    },this);

   
  }

  
}