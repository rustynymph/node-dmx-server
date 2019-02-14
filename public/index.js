var socket = io();
var mode = 0;
var universe;
var DMXControllerOptions = ['dmxking-ultra-dmx-pro', 'enttec-usb-dmx-pro', 'enttec-open-usb-dmx', 'artnet', 'bbdmx', 'dmx4all'];
var fixtureOptions = ['RGB Light'];
//var dmxController;
var fixtureButton, fixtureSelect, saveRigButton, animationButton, liveModeButton, 
uploadLayoutButton, layoutEditingModeButton, saveSceneButton, scenesElement, playPatternButton;
var selectedModeHighlightX;
var pattern; // change this later

function setup() {
  universe = new Universe(0);
  pattern = new Pattern();
  //dmxController = universe.dmxController;
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
  fill(167, 0, 255);
  stroke(0);
  rect(selectedModeHighlightX, 20, 250, 5); 
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
  selectedModeHighlightX = 0;
  addLayoutUIButtons();
  removeAnimationUIButtons();
  for (var f = 0; f < universe.fixtures.length; f++) {
    var fixture = universe.fixtures[f];
    fixture.updateColor();
    fixture.updateBrightness();
  }
  //removeLiveControlUIButtons();
}

function animationMode() {
  mode = 1;
  selectedModeHighlightX = 500;
  addAnimationUIButtons();
  removeLayoutUIButtons();
  //removeLiveControlUIButtons();
}

function liveControlMode() {
  mode = 2;
  selectedModeHighlightX = 250;
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

  for (var s = 0; s < pattern.sceneButtons.length; s++) {
    var linebreak = document.createElement("br");
    var msTextNode = document.createTextNode("ms");
    scenesElement['elt'].appendChild(linebreak);
    scenesElement['elt'].appendChild(pattern.sceneButtons[s]['elt']);   
    scenesElement['elt'].appendChild(pattern.timeInputs[s]['elt']);   
    scenesElement['elt'].appendChild(msTextNode);     
  }

  saveSceneButton = createButton('Save scene');
  saveSceneButton.position(width-330, 30);
  saveSceneButton.mousePressed(() => pattern.saveScene());      

  playPatternButton = createButton('Play pattern');
  playPatternButton.position(width-330, 50);
  playPatternButton.mousePressed(() => pattern.play());   

  loopPatternButton = createButton('Loop pattern');
  loopPatternButton.position(width-330, 70);
  loopPatternButton.mousePressed(() => pattern.loop());   
  
  stopLoopingPatternButton = createButton('Stop looping pattern');
  stopLoopingPatternButton.position(width-330, 90);
  stopLoopingPatternButton.mousePressed(() => pattern.stopLooping());     
  
  for (var i = 0; i < universe.fixtures.length; i++) {
    var fixture = universe.fixtures[i];
    fixture.animationcolorpicker.value(fixture.color);
    fixture.animationbrightnesspicker.value(fixture.brightness);
  }
}

function removeAnimationUIButtons() {
  saveSceneButton.remove();
  scenesElement.remove();
  playPatternButton.remove();
}

