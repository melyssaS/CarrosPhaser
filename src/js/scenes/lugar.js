
export default class eleccion extends Phaser.Scene {

  constructor() {

    super({ key: 'lugar' });

  }

  init(socket) {
    this.socket = socket;
  }
  create() {
    
    
    //mandar objetos con las key
    this.lugar = [{ key: 'mapa3', tilesetsName: 'tileSets', capa: 'solidos', tilesetsKey: 'tiles' },
    { key: 'mapa4', tilesetsName: 'Tileset', capa: 'solidos', tilesetsKey: 'tiles4' }];

    this.lugar1 = this.add.sprite(window.innerWidth / 2+300, window.innerHeight / 2, 'mundo2').setInteractive();
    this.lugar2 = this.add.sprite(window.innerWidth / 2 - 300, window.innerHeight / 2, 'mundo1').setInteractive();
    var text = this.add.bitmapText(window.innerWidth / 2, 500-window.innerHeight / 2, 'font',  'Choose your option, Player 1...', 30).setOrigin(0.5);
    

    this.lugar1.on('pointerdown', () => {
      this.socket.emit('lugarReady');
      this.socket.on('obtenerUserPlayer', (user) => {
        if (user == 1) {
          this.socket.emit('enviarLugar', this.lugar[0]);
        }
      }, this);

    });



    this.lugar2.on('pointerdown', () => {
      this.socket.emit('lugarReady');
      this.socket.on('obtenerUserPlayer', (user) => {
        if (user == 1) {
          this.socket.emit('enviarLugar', this.lugar[1]);
        }
      }, this);

    });



    this.socket.on('cambioEscena', (lugar) => {
      this.scene.start('mundo', [this.socket, lugar]);
    }, this);




  }
  update() {

  }

}