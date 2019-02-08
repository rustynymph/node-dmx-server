var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var open_sockets = []; // keeps track of connected clients
const PORT     = 8888;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);

  socket.on('dmx-color', function (data) {
    rgbColor = hexToRgb(data['color']);
    if (rgbColor) {
      dmx.update('myuniverse', {2: rgbColor['r'], 3: rgbColor['g'], 4: rgbColor['b']});
    }
    console.log(data);
  });

  socket.on('dmx-brightness', function (data) {
    dmx.update('myuniverse', {1: data['brightness']});
    console.log(data);
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

const DMX = require('dmx')
const dmx = new DMX();
const universe = dmx.addUniverse('myuniverse', 'dmxking-ultra-dmx-pro', '/dev/ttyUSB0');
//const universe = dmx.addUniverse('myuniverse', 'enttec-usb-dmx-pro', '/dev/ttyUSB0');

dmx.update('myuniverse', {1: 100, 2: 255, 3: 50, 4: 255})

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
