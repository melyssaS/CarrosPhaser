export default class lobby extends Phaser.Scene {

  constructor() {

    super({ key: 'lobby' });

  }
  init(data) {
    this.select = data;

  }

  create() {

    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('ready', this.select);
    }, this);

    this.socket.on('numeroPlayer', (numero) => {
      if (numero[0] > numero[1]) {
        
        var text = this.add.bitmapText(window.innerWidth / 2, 60 + window.innerHeight / 2, 'font', 'sorry, you cannot play...', 16).setOrigin(0.5);
        this.socket.disconnect();

      } else if (numero[0] < numero[1]) {
        var mensaje = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'font', 'Welcome Player '+numero[0], 16).setOrigin(0.5);
        var text = this.add.bitmapText(window.innerWidth / 2, 60 + window.innerHeight / 2, 'font', 'waiting for the players...', 16).setOrigin(0.5);
      } else {
        this.socket.emit('comenzar');
      }
    }, this);

    ///revisar , puede que sea inecesario
    this.socket.on('startScene', () => {
      this.scene.start('eleccion', this.socket);
    }, this);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {

  }


}