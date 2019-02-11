var socket = io();
var mode = 0;
var DMXControllerOptions = ['dmxking-ultra-dmx-pro', 'enttec-usb-dmx-pro', 'enttec-open-usb-dmx', 'artnet', 'bbdmx', 'dmx4all'];
var fixtureOptions = ['RGB Light'];
var dmxController;
var universe;
var fixtureButton, fixtureSelect, saveRigButton, animationButton, liveModeButton, 
uploadLayoutButton, layoutEditingModeButton, saveSceneButton, scenesElement, playPatternButton;
var scenes = [];

function setup() {
  dmxController = new DMXController(DMXControllerOptions[0]);
  universe = new Universe(0);
  addUIButtons();
  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  canvas.style('display', 'block');
  canvas.parent('fixture-editor'); 
  addUIButtons();
  addLayoutUIButtons();
}

function draw() { 
  background(0);
  displayObjects();
  fill(255);
  stroke(255);
  rect(0, 0, windowWidth, 20);
  fill(0);
  stroke(255);
  textSize(12);
  text('upload project', 760, 15);  
  if (mode == 0) { // layout/rig editing mode
    fill(167, 0, 255);
    stroke(0);
    rect(0, 20, 250, 5);
  }
  if (mode == 1) { // animation editing mode
    fill(167, 0, 255);
    stroke(0);
    rect(500, 20, 250, 5);
  }     
  if (mode == 2) { // live control mode
    fill(167, 0, 255);
    stroke(0);
    rect(250, 20, 250, 5);
  } 
}

function mousePressed() {
  if (mode == 0) {
    mousePressedLayoutEditingMode();
  }
}

function mouseDragged() {
  if (mode == 0) {
    mouseDraggedLayoutEditingMode();
  }
}

function mouseReleased() {
  if (mode == 0) {
    mouseReleasedLayoutEditingMode();
  }
}

function layoutEditingMode() {
  mode = 0;
  addLayoutUIButtons();
  removeAnimationUIButtons();
  //removeLiveControlUIButtons();
}

function animationMode() {
  mode = 1;
  addAnimationUIButtons();
  removeLayoutUIButtons();
  //removeLiveControlUIButtons();
}

function liveControlMode() {
  mode = 2;
  //addLiveControlUIButtons();
  removeLayoutUIButtons();
  removeAnimationUIButtons();
}

function addUIButtons() {
  animationButton = createButton('Animation editor');
  animationButton.position(510, 10);
  animationButton.mousePressed(animationMode); 
  animationButton.size(250);
  
  liveModeButton = createButton('LIVE MODE');
  liveModeButton.position(260, 10);
  liveModeButton.mousePressed(liveControlMode);
  liveModeButton.size(250);

  layoutEditingModeButton = createButton('Layout editor');
  layoutEditingModeButton.position(10, 10);
  layoutEditingModeButton.mousePressed(layoutEditingMode);  
  layoutEditingModeButton.size(250);

  uploadLayoutButton = createFileInput(handleFile);
  uploadLayoutButton.position(850, 10);  
}

function addLayoutUIButtons() {
  fixtureSelect = createSelect();
  fixtureSelect.position(10, 40);
  for (var f = 0; f < fixtureOptions.length; f++) {
    fixtureSelect.option(fixtureOptions[f]);
  }
  fixtureButton = createButton('Add fixture');
  fixtureButton.position(100, 40);
  fixtureButton.mousePressed(() => addFixture(0, fixtureSelect.value()));    

  saveRigButton = createButton('Save layout');
  saveRigButton.position(10, 60);
  saveRigButton.mousePressed(saveProject);    
}

function removeLayoutUIButtons() {
  fixtureSelect.remove();
  fixtureButton.remove();
  saveRigButton.remove();
}

function addAnimationUIButtons() {
  scenesElement = createDiv('Scenes');
  scenesElement.size(250, height-20);
  scenesElement.position(width-250, 28);
  scenesElement.style('background-color', '#ffffff');
  scenesElement.style('overflow', 'auto');
  scenesElement.style('overflow-x', 'hidden');
  scenesElement.attribute('id', 'scenes-div');
  scenesElement.attribute('font-family', 'Arial, Helvetica, sans-serif');

  saveSceneButton = createButton('Save scene');
  saveSceneButton.position(width-330, 30);
  saveSceneButton.mousePressed(() => saveScene());      

  playPatternButton = createButton('Play pattern');
  playPatternButton.position(width-330, 50);
  playPatternButton.mousePressed(() => playPattern());       
}

function removeAnimationUIButtons() {
  saveSceneButton.remove();
  scenesElement.remove();
  playPatternButton.remove();
}

function saveScene() {
  var fixtureJson = {};
  for (var f = 0; f < universe.fixtures.length; f++) {
    var fixture = universe.fixtures[f];
    var fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
      positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size, connectedTo: fixture.connectedTo,
       connectedBy: fixture.connectedBy};
      for (var c = 0; c < fixture.channels.length; c++) {
          channel = fixture.channels[c];
          fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
      }
  }

  scenes.push(new Scene(fixtureJson));
  var btn = document.createElement("BUTTON");
  btn.innerHTML = 'Scene ' + scenes.length;
  scenesElement['elt'].innerHTML = scenesElement['elt'].innerHTML + '<br>';
  scenesElement['elt'].appendChild(btn);
}