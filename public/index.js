var socket = io();
var mode = 0;
var DMXControllerOptions = ['dmxking-ultra-dmx-pro', 'enttec-usb-dmx-pro', 'enttec-open-usb-dmx', 'artnet', 'bbdmx', 'dmx4all'];
var fixtureOptions = ['RGB Light'];
var dmxController;
var universe;
var fixtureButton, fixtureSelect, saveRigButton, animationButton, liveModeButton, uploadLayoutButton, layoutEditingModeButton;

function setup() {
  dmxController = new DMXController(DMXControllerOptions[0]);
  universe = new Universe(0);
  addUIButtons();
  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  canvas.style('display', 'block');
  canvas.parent('fixture-editor'); 
}

function draw() { 
  background(0);
  displayObjects();
  fill(255);
  stroke(0);
  textSize(12);
  text('upload project', 8, 15);  
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
  addUIButtons();
}

function animationMode() {
  mode = 1;
  addUIButtons();
}
function liveControlMode() {
  mode = 2;
  addUIButtons();
}

function addUIButtons() {
  fixtureSelect = createSelect();
  fixtureSelect.position(10, 30);
  for (var f = 0; f < fixtureOptions.length; f++) {
    fixtureSelect.option(fixtureOptions[f]);
  }
  fixtureButton = createButton('Add fixture');
  fixtureButton.position(100, 30);
  fixtureButton.mousePressed(() => addFixture(0, fixtureSelect.value()));    
  animationButton = createButton('Animation editor');
  animationButton.position(10, 70);
  animationButton.mousePressed(animationMode); 
  liveModeButton = createButton('LIVE MODE');
  liveModeButton.position(10, 90);
  liveModeButton.mousePressed(liveControlMode);
  //layoutEditingModeButton = createButton('Layout editor');
  //layoutEditingModeButton.position(10, 70);
  //layoutEditingModeButton.mousePressed(layoutEditingMode);  

  /*
  if (mode == 0) { // fixture editing mode
    fixtureButton = createButton('Add fixture');
    fixtureButton.position(10, 30);
    fixtureButton.mousePressed(() => addFixture(0));    
    animationButton = createButton('Animation editor');
    animationButton.position(10, 70);
    animationButton.mousePressed(animationMode); 
    liveModeButton = createButton('LIVE MODE');
    liveModeButton.position(10, 90);
    liveModeButton.mousePressed(liveControlMode);
    layoutEditingModeButton.remove();      
  }
  else if (mode == 1) { // animation editing mode  
    layoutEditingModeButton = createButton('Layout editor');
    layoutEditingModeButton.position(10, 70);
    layoutEditingModeButton.mousePressed(layoutEditingMode); 
    liveModeButton = createButton('LIVE MODE');
    liveModeButton.position(10, 90);
    liveModeButton.mousePressed(liveControlMode);      
    fixtureButton.remove();      
    animationButton.remove();      
  }  
  else if (mode == 2) { // live control mode
    animationButton = createButton('Animation editor');
    animationButton.position(10, 70);
    animationButton.mousePressed(animationMode);   
    layoutEditingModeButton = createButton('Layout editor');
    layoutEditingModeButton.position(10, 70);
    layoutEditingModeButton.mousePressed(layoutEditingMode);   
    fixtureButton.remove();      
    liveModeButton.remove();      
  }
*/

  uploadLayoutButton = createFileInput(handleFile);
  uploadLayoutButton.position(100, 10);  
  saveRigButton = createButton('Save layout');
  saveRigButton.position(10, 50);
  saveRigButton.mousePressed(saveProject);  
}