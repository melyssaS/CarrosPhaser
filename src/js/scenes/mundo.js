
import Carro from '../objetos/carro.js';

export default class mundo extends Phaser.Scene {


  constructor() {

    super({ key: 'mundo' });



  }

  init(data) {

    this.socket = data[0];
    this.lugar = data[1];

  }

  create() {

    this.cameras.main.backgroundColor.setTo(108, 210, 222);
    //Se le asigna Fondo
    this.fondo = this.make.tilemap({ key: 'fondo' });
    this.ifondo = this.fondo.addTilesetImage('Fondo2', 'ifondo')
    this.dfondo = this.fondo.createDynamicLayer('capa', this.ifondo, 0, 100)


    //Cambiar por los objetos lugar
    this.mapa = this.make.tilemap({ key: this.lugar.key });
    this.tilesets = this.mapa.addTilesetImage(this.lugar.tilesetsName, this.lugar.tilesetsKey);
    this.solidos = this.mapa.createDynamicLayer(this.lugar.capa, this.tilesets, -52, 100);
    this.solidos.setCollisionByProperty({ solido: true });



    this.otrosJugadores = this.add.group();



    this.socket.emit('sceneReady');

    this.socket.on('newPlayers', (players) => {

      Object.keys(players).forEach((id) => {
        if (id == this.socket.id) {
          this.addPlayer(players[id]);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });

    }, this);




    this.socket.on('disconnect', (id) => {

      this.otrosJugadores.children.each((o) => {

        if (o.id == id) {
          //objeto , lo removemos de la escena y luego lo destruimos del grupo
          this.otrosJugadores.remove(o, true, true);
        }
      }, this)
    })



    this.socket.on('emitirPosicion', (infos) => {

      this.otrosJugadores.children.each((o) => {
        if (o.id == infos[1]) {
          o.x = infos[0].x;
          o.y = infos[0].y;
          o.setAngle(infos[0].angle);
        }
      }, this)

    })


    this.socket.on('cambiar', (player) => {
      if (player. playerId == this.socket.id) {
        var user=player.user;
        this.socket.close();
        this.scene.start('ganador',user);
      }
    }, this);
    this.cursors = this.input.keyboard.createCursorKeys();

  }
  update() {
    if (this.player) {

      if (this.cursors.right.isDown) {
        this.player.setVelocityX(4);


      } else if (this.cursors.left.isDown) {
        this.player.setVelocity(-4, 0);
      }



      else {
        this.player.setVelocity(0, 3);
      }

      this.socket.emit('nuevaPosicion', { x: this.player.x, y: this.player.y, finish: this.mapa.widthInPixels, angle: this.player.angle });
    }
  }

  addPlayer(playerInfo) {
    this.matter.world.convertTilemapLayer(this.solidos);

    this.player = this.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.keyimagen, playerInfo.imagen, { shape: playerInfo.fisica });
    this.player.setDensity(50);
    this.cameras.main.setBounds(0, 0, this.mapa.widthInPixels, this.mapa.heightInPixels + 100);
    this.cameras.main.startFollow(this.player);
  }

  addOtherPlayers(playerInfo) {
    var Otro = this.add.sprite(playerInfo.x, playerInfo.y, playerInfo.keyimagen, playerInfo.imagen, { shape: playerInfo.fisica });
    Otro.id = playerInfo.playerId;
    this.otrosJugadores.add(Otro);

  }

}