var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var open_sockets = []; // keeps track of connected clients
const PORT     = 8888;

const DMX = require('dmx')
const dmx = new DMX();
var universes = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);

  /*
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
  */

  socket.on('layout-updated', function (data) {
    console.log(data);
    //if (universe) universe.close();
    universe = dmx.addUniverse('myuniverse', 'dmxking-ultra-dmx-pro', '/dev/ttyUSB0');
    channelValues = {};
    for (var d = 0; d < data['dmxControllers'].length; d++) {
      var dmxController = data['dmxControllers'][d];
      console.log(dmxController);
      for (var u = 0; u < dmxController['universes'].length; u++) {
        var uni = dmxController['universes'][u];
        var universe = dmx.addUniverse(universe.name, dmxController.type, '/dev/ttyUSB0'); // make usb port changable
        universes.push(universe);
        for (var f = 0; f < uni.fixtures.length; f++) {
          var fixture = uni.fixtures[f];
          for (var c = 0; c < fixture.channels.length; c++) {
            var channel = fixture.channels[c];
            channelValues[fixture.startingAdress + c + 1] = channel.value; // this library counts up from 1, not 0
        }
        }
        console.log(channelValues);
        dmx.update(universe.name, channelValues)
      }
    }
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