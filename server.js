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
    runAnimation(data);
  });  

  socket.on('loop-animation', function (data) {
    loopAnimation(data);
  });  

  socket.on('stop-all-animations', function (data) {
    for (var a = 0; a < animations.length; a++) {
      //animations[a].stop();
      clearInterval(animations[a]);
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

function runAnimation(data) {
  var waittime = 0;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var sceneData = data[key];
      var channelsData = sceneData['channelData'];
      var timeData = parseInt(sceneData['time']);
      updateDMXAndWait(universeName, channelsData, waittime);
      waittime += timeData;
    }
  }
  return waittime;
}

function loopAnimation(data) {
  var totalwaittime = runAnimation();
  console.log(totalwaittime);
  var timeIntervalID = setInterval(() => {
    runAnimation(data);
  }, totalwaittime); 
  animations.push(timeIntervalID);
}

function updateDMXAndWait(uniName, channels, time) {
  setTimeout(() => {dmx.update(uniName, channels)}, time);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}