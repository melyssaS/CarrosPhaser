import Prealoder from './scenes/preloader.js';
import Inicio from './scenes/inicio.js';
import Mundo from './scenes/mundo.js';
import Eleccion from './scenes/eleccion.js';
import Lobby from './scenes/lobby.js';
import Ganador from './scenes/ganador.js';
import Lugar from './scenes/lugar.js';

var config = {
  type:Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'matter',
    arcade: {
        gravity: {y: 1000},
        debug: true
    }
},
  backgroundColor: 0x000000,
}

class Game extends Phaser.Game{
  constructor(){
    super(config);
    this.scene.add('inicio',new Inicio());
    this.scene.add('lobby',new Lobby());
    this.scene.add('mundo',new Mundo());
    this.scene.add('ganador',new Ganador());
    this.scene.add('eleccion',new Eleccion());
   this.scene.add('lugar',new Lugar());
    this.scene.add('Preloader',new Prealoder());
    this.scene.start('Preloader');
  }
}

window.game = new Game();
