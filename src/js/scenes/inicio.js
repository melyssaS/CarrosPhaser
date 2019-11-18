


export default class inicio extends Phaser.Scene {

  constructor() {

    super({ key: 'inicio' });

  }
  create() {

    //let background =this.add.sprite(0,0,"bb");
    //background.setOrigin(0,0);
    this.add.image(window.innerWidth / 2, window.innerHeight / 2 ,"fondo1").setScale(1.5).setOrigin();
    this.select = 1;
    var text = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2 - 105, 'font', 'By Jhan Utria, Carlos Parada and Melyssa Solano.', 12).setOrigin(0.5);
    var title = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2 - 150, 'font', 'WELCOME!', 90).setOrigin(0.5).setCenterAlign().setInteractive();
    this.player1 = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'font', '[ONE player]', 50).setOrigin(0.5).setCenterAlign().setInteractive();
    this.player2 = this.add.bitmapText(window.innerWidth / 2, 60 + window.innerHeight / 2, 'font', 'TWO players', 38).setOrigin(0.5).setCenterAlign().setInteractive();
    this.player3 = this.add.bitmapText(window.innerWidth / 2, 120 + window.innerHeight / 2, 'font', 'THREE players', 38).setOrigin(0.5).setCenterAlign().setInteractive();
    var mainText = this.add.bitmapText(window.innerWidth / 2, 190 + window.innerHeight / 2, 'font', 'Press [SPACEBAR] to start', 16).setOrigin(0.5).setCenterAlign().setInteractive();


    this.cursors = this.input.keyboard.createCursorKeys();
    //document.onkeydown = this.eventosTeclado;

    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 38) {
        this.direccionArriba();

      } else if (e.keyCode == 40) {
        this.direccionAbajo();
        
      }
    });
  }
  update() {

    if (this.cursors.space.isDown)
      this.scene.start('lobby', this.select);
    

  }

  direccionArriba() {
   
    if (this.select == 2) {
      this.select = 1;
      this.player2.setText('TWO players').setFontSize(38).setOrigin(0.5).setCenterAlign().setInteractive();
      this.player1.setText('[ONE player]').setFontSize(50).setOrigin(0.5).setCenterAlign().setInteractive();

    } else if (this.select == 3) {
      this.select = 2;
      this.player3.setText('THREE players').setFontSize(38).setOrigin(0.5).setCenterAlign().setInteractive();
      this.player2.setText('[TWO player]').setFontSize(50).setOrigin(0.5).setCenterAlign().setInteractive();
    }


  }



  direccionAbajo() {

    if (this.select == 1) {
      this.select = 2;
      this.player1.setText('ONE players').setFontSize(38).setOrigin(0.5).setCenterAlign().setInteractive();
      this.player2.setText('[TWO player]').setFontSize(50).setOrigin(0.5).setCenterAlign().setInteractive();

    } else if (this.select == 2) {
      this.select = 3;
      this.player3.setText('[THREE players]').setFontSize(50).setOrigin(0.5).setCenterAlign().setInteractive();
      this.player2.setText('TWO player').setFontSize(38).setOrigin(0.5).setCenterAlign().setInteractive();

    }

  }
}




