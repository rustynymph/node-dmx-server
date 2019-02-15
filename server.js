var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var open_sockets = []; // keeps track of connected clients
const PORT     = 8888;

const DMX = require('dmx');
const dmx = new DMX();
var universe = null;
var universeName = 'universe';
var animations = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);
  
  socket.on('dmx-updated', function (data) {
    var controllerType = data['dmxControllerType'];
    var channels = data['channels'];
    if (!universe) {
      universe = dmx.addUniverse(universeName, controllerType, '/dev/ttyUSB0'); // make usb port changable
    }
    dmx.update(universeName, channels);
    console.log(channels);
  });

  socket.on('run-animation', function (data) {
    console.log(data);

    //var animation = new DMX.Animation();
    /*for (var key in data) { 
      if (data.hasOwnProperty(key)) {
        for (var i = 0; i < data[key].length; i++) {
          var info = data[key][i]; // channel values over time
          var value = info['value']; 
          var time = info['time']; 
          if (key && value && time)
            animation.add({key: value, key: value, ...}, time);
            animations.push(animation);
          console.log(key);
          console.log(value);
          console.log(time);                   
        }
      }
    }
    for (var a = 0; a < animations.length; a++) {
      animations[a].runLoop(universe);
    }*/
    /*dmx.update(universeName, {1: 255, 2: 0, 3: 0, 4: 0, 5: 0});
    animation.add({2: 255, 3: 0, 4: 0}, 500);
    animation.add({2: 0, 3: 255, 4: 0}, 500);
    animation.add({2: 0, 3: 255, 4: 255}, 500);
    animation.runLoop(universe);*/

    var waittime = 0;
    for (var key in data) { 
      if (data.hasOwnProperty(key)) {
        var sceneData = data[key];
        var channelsData = sceneData['channelData'];
        var timeData = parseInt(sceneData['time']);
        setTimeout(() => {dmx.update(universeName, channelsData)}, waittime);
        waittime += timeData;
      }
    }


  });  

  socket.on('stop-all-animations', function (data) {
    for (var a = 0; a < animations.length; a++) {
      animations[a].stop();
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