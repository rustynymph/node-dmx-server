var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var open_sockets = []; // keeps track of connected clients
const PORT     = 8888;

const DMX = require('dmx')
const dmx = new DMX();
var universe;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);
  
  socket.on('dmx-updated', function (data) {
    var controllerType = data['dmxControllerType'];
    var universeName = data['universeName'];
    var channels = data['channels'];
    if (dmx.universes[universeName]) {
      dmx.universes[universeName] = new dmx.drivers[controllerType]('/dev/ttyUSB0');
      universe = dmx.universes[universeName];
    } else {
      universe = dmx.addUniverse(universeName, controllerType, '/dev/ttyUSB0'); // make usb port changable
    }
    dmx.update(universeName, channels);
  });

  socket.on('disconnect', function(){
    open_sockets = open_sockets.filter(function(item){
      return item != socket;
    });
  });
});

http.listen(PORT, function(){
  console.log('listening for WEBSOCKET connections on *:'+ PORT);
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}