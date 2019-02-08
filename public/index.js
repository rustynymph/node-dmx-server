var socket = io();

function updateColor(value) {
  socket.emit('dmx-color', {color: value});
  console.log(value);
}

function updateBrightness(value) {
  socket.emit('dmx-brightness', {brightness: value});
  console.log(value);
}

