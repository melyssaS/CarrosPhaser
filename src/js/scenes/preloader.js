export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  preload() {

    this.load.on('complete', () => {
      this.scene.start('inicio');
    }, this);
    //Carros
    //i al inicio hace referencia a imagen, f al inicio hace referencia a fisica

    this.load.atlas('icarro1', 'src/assets/carro/coche1.png', 'src/assets/carro/coche1.json');
    this.load.json('fcarro1', 'src/assets/carro/fcoche1.json');

    this.load.atlas('icarro2', 'src/assets/carro/coche2.png', 'src/assets/carro/coche2.json');
    this.load.json('fcarro2', 'src/assets/carro/fcoche2.json');

    this.load.atlas('icarro3', 'src/assets/carro/coche3.png', 'src/assets/carro/coche3.json');
    this.load.json('fcarro3', 'src/assets/carro/fcoche3.json');

    this.load.image("fondo1", "src/assets/fonts/fondo2.png");
    this.load.image("fondo2", "src/assets/fonts/fondo3.png");
    this.load.image("fondo3", "src/assets/fonts/fondo4.png");
    //Fuentes

    this.load.bitmapFont('font', 'src/assets/fonts/font.png', 'src/assets/fonts/font.fnt');


    //Mapas

    //Mapa1
    this.load.tilemapTiledJSON('mapa3', 'src/assets/mapa/mapa3.json');
    this.load.image('tiles', 'src/assets/mapa/tileSets.png');
    //Mapa2
    this.load.tilemapTiledJSON('mapa4', 'src/assets/mapa/mapa4.json');
    this.load.image('tiles4', 'src/assets/mapa/Tileset.png');

    //Fondo
    this.load.tilemapTiledJSON('fondo','src/assets/mapa/fondo.json')
    this.load.image('ifondo','src/assets/mapa/Fondo2.png')

    //Imagenes de Mapa
    this.load.image('mundo1', 'src/assets/mapa/mundo1.png');
    this.load.image('mundo2', 'src/assets/mapa/mundo2.png');
  }
}