// there should be separate modes: layout editing, live control, scene programming, pattern/animation programming

var DMXControllerOptions = ['dmxking-ultra-dmx-pro', 'enttec-usb-dmx-pro', 'enttec-open-usb-dmx', 'artnet', 'bbdmx', 'dmx4all'];
var dmxControllers = [];
var universes;
var universe;
var locked = false;
var layoutObjects;
var inProgressLineStartPointX = inProgressLineStartPointY = 0;
var inProgressLineEndPointX = inProgressLineEndPointY = 0;
var lineDrawingInProgress = false;
var firstConnectionInLine = null;
var cables = [];

function setup() {
  universes = [];
  universe = new Universe(universes.length);
  universes.push(universe);

  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  canvas.style('display', 'block');
  canvas.parent('fixture-editor');

  fixtureButton = createButton('Add DMX Controller');
  fixtureButton.position(10, 10);
  fixtureButton.mousePressed(addDMXController);

  fixtureButton = createButton('Add fixture');
  fixtureButton.position(10, 30);
  fixtureButton.mousePressed(() => addFixture(0));

  fixtureButton = createButton('Save rig layout');
  fixtureButton.position(10, 50);
  fixtureButton.mousePressed(saveLayout);  

  animationButton = createButton('Animation editor');
  animationButton.position(10, 70);
  //animationButton.mousePressed(); 
  
  liveModeButton = createButton('LIVE MODE');
  liveModeButton.position(10, 90);
  //liveModeButton.mousePressed();   
}

function draw() { 
  background(0);
  /* Update fixture layout based on current state, this includes positions, colors, hovering, etc */
  layoutObjects = [];
  layoutObjects = layoutObjects.concat(dmxControllers);
  for (let d = 0; d < dmxControllers.length; d++) {
    layoutObjects.push(dmxControllers[d].out);
  }
  // at some point universes should be children of dmx controllers
  for (let u = 0; u < universes.length; u++) {
    for (let f = 0; f < universes[u].fixtures.length; f++){
      var fixture = universes[u].fixtures[f];
      layoutObjects.push(fixture.in);
      layoutObjects.push(fixture.out);
    }
    layoutObjects = layoutObjects.concat(universes[u].fixtures);
  }
  for (let i = 0; i < layoutObjects.length; i++) {
    layoutObjects[i].display();
  }

  for (var c = 0; c < cables.length; c++) {
    cables[c].display();
  }

  if (lineDrawingInProgress) {
    stroke(255);
    line(inProgressLineStartPointX, inProgressLineStartPointY, mouseX, mouseY);
  }

}

function mousePressed() {
  for (let i = 0; i < layoutObjects.length; i++) {
    var thing = layoutObjects[i];
    if (thing.isHovered && thing.isHovered()) {
      if (thing.pressed) thing.pressed();
    }
  }
}

function mouseDragged() {
  if (lineDrawingInProgress) {
    inProgressLineEndPointX = mouseX;
    inProgressLineEndPointY = mouseY;
  } else {
    for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.isHovered()) {
        thing.dragged();
        if (thing.connectingAWire && thing.connectingAWire() && thing.type == 'out'){
          if (!thing.connectedTo) { // the thing is not currently connected to anything
            if (!lineDrawingInProgress){
              firstConnectionInLine = thing;
              inProgressLineStartPointX = thing.x;
              inProgressLineStartPointY = thing.y;
              lineDrawingInProgress = true;
            }
          }
          else console.log("already connected to something");
          for (var c = 0; c < cables.length; c++) {
            if (cables[c].firstObject == thing) {
              cables[c].firstObject.connectedTo = null;
              cables[c].secondObject.connectedBy = null;
              delete cables[c];
              cables.splice(c, 1);
              return;
            }
          }
        }
      }
    }
  }
}

function mouseReleased() {
  if (lineDrawingInProgress){
    for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.isHovered() && thing.connectingAWire && // we are hovering an attachable node
         (thing.parent != firstConnectionInLine.parent && // don't connect with a cable if part of same fixture
            (thing.type != firstConnectionInLine.type))) { // don't connect with cable unless it's an in and out connection
              console.log("yeah");
              var cable = new Cable(firstConnectionInLine, thing);
              cables.push(cable);
              firstConnectionInLine.connectedTo = thing;
              thing.connectedBy = firstConnectionInLine;
            }
    }
    // check if mouse hovered over another node, if so connect it. Otherwise cancel the line
  }
  lineDrawingInProgress = false;
  for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.released) thing.released();
  }
}

function addFixture(universeNumber) {
  for (var u = 0; u < universes.length; u++) {
    universe = universes[u];
    if (universe.number == universeNumber) {
      universe.addFixture(new Fixture(universe.fixtures.length));
      return;
    }
  }
}

function addDMXController() {
  dmxControllers.push(new DMXController(DMXControllerOptions[0], dmxControllers.length));
}

function updateRig(){
  for (var i=0; i < universe.fixtures.length; i++){

  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}