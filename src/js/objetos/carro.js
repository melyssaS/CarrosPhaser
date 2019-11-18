
export default class carro extends Phaser.Physics.Matter.Sprite {

  constructor(scene, world, x, y, keyimagen, imagen, fisica, socket) {
    super(world, x, y, 'icarro1', 'coche11.png');

    this.socket = socket;
    this.carro=scene.matter.add.sprite(x, y, 'icarro1', 'coche11.png');
    this.setStatic(true);
    this.setSize(236, 50);
    this.largo = scene.mapa.widthInPixels;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.right.isDown)
      this.setVelocity(3, 0);
    else if (this.cursors.left.isDown)
      this.setVelocity(-3, 0);
    else
      this.setVelocity(0, 200);


    this.socket.emit('nuevaPosicion', { x: this.x, y: this.y, finish: this.largo });




  }



}
