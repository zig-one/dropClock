let server = require('./server.js').server;//BEEP(beepkind)
var sio = require('socket.io')(server);
//console.log("Add");
// Attach the socket.io server
io = sio.listen(server);
// Define a message handler
io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {});});

function broadcast(message){
//console.log("emit");
     io.emit('message',message);
     console.log("emit");
	
}


module.exports={
broadcast:broadcast
};
