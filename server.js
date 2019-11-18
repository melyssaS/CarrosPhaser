
var PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
var server = require('http').Server(app);

app.set('port', process.env.PORT || 2000);
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

var io = require('socket.io').listen(server);

var players = {};
var cantidad=0;
var posicion = [];
var coche = []

//iniciamos conexion
io.on('connection', (socket) => {
  console.log('nueva conexion ', socket.id);
  //Estamos listos
  socket.on('ready', (select) => {
    posicion=[];
    coche = [];
    players[socket.id] = {
      playerId: socket.id,
      x: 100,
      y: 0,
      user: io.engine.clientsCount,
      keyimagen:'',
      imagen:'',
      fisica:''
    };
   console.log('user '+players[socket.id].user);
    if (players[socket.id].user == 1) {
      cantidad = select;
    }
    socket.emit('numeroPlayer', [players[socket.id].user, cantidad]);
  }, this);

//Socket para lugar
socket.on('lugarReady',()=>{
  socket.emit('obtenerUserPlayer',players[socket.id].user);
})
  
  socket.on('enviarLugar',(lugar)=>{
    io.emit('cambioEscena',lugar);
  })

  //Fin de socket para lugar
  socket.on('comenzar', () => {
    io.sockets.emit('startScene');

  })


 socket.on('eleccionReady',()=>{
socket.emit('borrarImagen')
  });

  socket.on('enviarImagen',(componentes)=>{
    players[socket.id].keyimagen=componentes[0];
    players[socket.id].imagen=componentes[1];
    players[socket.id].fisica=componentes[2];
    coche.push(componentes[0]);
    if (coche.length==cantidad) {
      io.emit('cambioEscena');
    }
  })

  socket.on('sceneReady', () => {
    socket.emit('newPlayers', players); 
  });

  socket.on('nuevaPosicion', (info) => {
    if (info.finish==info.x) {
      posicion.push(players[socket.id].user)   
      socket.emit('cambiar',players[socket.id].playerId)
    }
    socket.broadcast.emit('emitirPosicion', [info, socket.id]);


  });



  socket.on("disconnect", () => {
    console.log('player #'+io.engine.clientsCount+' desconectado');
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  }, this);


 socket.on('posicion', ()=>{
   console.log("Posiciones "+posicion);
    io.emit('posiciones',{pos:posicion,co:coche})
    if (posicion.length==cantidad) {
      io.emit('finalizar')
    }
  });


  console.log(players)
}, this);


server.listen(app.listen(app.get('port')), function () {
  console.log(`Listening on ${server.address().port}`);
});