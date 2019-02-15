/* 
 * This file sets up our p5.js canvas and initializes
 * the UI elements of the editor
 * Author: Annie Kelly
 */

var socket = io();                // creates web socket connection to server

var universe;                     // for now you can edit one DMX512 universe at a time
var patterns = [];                // keeps track of patterns (animations) users have created
var pattern;                      // change this later

var mode = 0;                     // application starts out in layout editing mode
var selectedModeHighlightX = 0;   // position of highlighted segment in nav bar

var fixtureButton, saveRigButton, // references to UI elements
  animationButton, liveModeButton,
  uploadLayoutButton, layoutEditModeButton,
  saveSceneButton, playPatternButton, 
  playPatternDMXButton, loopPatternDMXButton, 
  stopLoopPatternDMXButton, fixtureSelect,
  scenesElement;

/* 
 * initializes our dmx universe & sets up our editor, p5.js function that runs once
 */
function setup() {
  universe = new Universe(0);
  pattern = new Pattern();
  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  canvas.style('display', 'block');
  canvas.parent('fixture-editor'); 
  createAndShowUIButtons();
  createAndShowLayoutUIButtons();
  createAndShowAnimationUIButtons();
  createAndShowLiveUIButtons();
  hideAnimationUIButtons();
  hideLiveUIButtons();  
}

/*
 * p5.js loop that updates our canvas and makes calls to render our objects
 */
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


function layoutEditingMode() {
  mode = 0;
  selectedModeHighlightX = 0;
  showLayoutUIButtons();
  hideAnimationUIButtons();
  hideLiveUIButtons();
}

function animationMode() {
  mode = 1;
  selectedModeHighlightX = 500;
  showAnimationUIButtons();
  hideLayoutUIButtons();
  hideLiveUIButtons();
}

function liveControlMode() {
  mode = 2;
  selectedModeHighlightX = 250;
  showLiveUIButtons
  showLiveUIButtons();
  hideLayoutUIButtons();
  hideAnimationUIButtons();
}

/*
 * helper functions to show or hide relevant UI elements
 */
function showLayoutUIButtons() {
  fixtureSelect.show();
  fixtureButton.show();
  saveRigButton.show();  
}

function hideLayoutUIButtons() {
  fixtureSelect.hide();
  fixtureButton.hide();
  saveRigButton.hide();
}

function showAnimationUIButtons() {
  scenesElement.show();
  saveSceneButton.show();
  playPatternButton.show();
  loopPatternButton.show();
  stopLoopingPatternButton.show();  
}

function hideAnimationUIButtons() {
  saveSceneButton.hide();
  scenesElement.hide();
  playPatternButton.hide();
  loopPatternButton.hide();
  stopLoopingPatternButton.hide();
}

function showLiveUIButtons() {
  playPatternDMXButton.show();
  loopPatternDMXButton.show();
  stopLoopPatternDMXButton.show();
}

function hideLiveUIButtons() {
  playPatternDMXButton.hide();
  loopPatternDMXButton.hide();
  stopLoopPatternDMXButton.hide();  
}

/*
 * helper functions that actually initialize the UI elements in the DOM
 */
function createAndShowLayoutUIButtons() {
  fixtureSelect = createSelect();
  fixtureSelect.position(10, 40);
  for (var f = 0; f < fixtureOptions.length; f++) {
    fixtureSelect.option(fixtureOptions[f]);
  }
  fixtureButton = createButton('Add fixture');
  saveRigButton = createButton('Download project');
  fixtureButton.position(100, 40);
  saveRigButton.position(10, 60);
  fixtureButton.mousePressed(() => addFixture(0, fixtureSelect.value()));    
  saveRigButton.mousePressed(saveProject);    
}

function createAndShowAnimationUIButtons() {
  scenesElement = createDiv('Scenes');
  scenesElement.size(250, height-20);
  scenesElement.position(width-250, 28);
  scenesElement.style('background-color', '#ffffff');
  scenesElement.style('overflow', 'auto');
  scenesElement.style('overflow-x', 'hidden');
  scenesElement.attribute('id', 'scenes-div');
  scenesElement.attribute('font-family', 'Arial, Helvetica, sans-serif');
  saveSceneButton   = createButton('Save scene');
  playPatternButton = createButton('Play pattern');
  loopPatternButton = createButton('Loop pattern');
  stopLoopingPatternButton = createButton('Stop looping pattern');
  saveSceneButton.position(width-330, 30);
  playPatternButton.position(width-330, 50);
  loopPatternButton.position(width-330, 70);
  stopLoopingPatternButton.position(width-330, 90);
  saveSceneButton.mousePressed(() => pattern.saveScene());      
  playPatternButton.mousePressed(() => pattern.play());   
  loopPatternButton.mousePressed(() => pattern.loop());   
  stopLoopingPatternButton.mousePressed(() => pattern.stopLooping());
}

function createAndShowLiveUIButtons() {
  playPatternDMXButton     = createButton('Play pattern');
  loopPatternDMXButton     = createButton('Loop pattern');
  stopLoopPatternDMXButton = createButton('Stop looping pattern');
  playPatternDMXButton.position(10, 40);
  loopPatternDMXButton.position(10, 60);
  stopLoopPatternDMXButton.position(10, 80);
  playPatternDMXButton.mousePressed(playPatternDMX);    
  loopPatternDMXButton.mousePressed(loopPatternDMX);   
  stopLoopPatternDMXButton.mousePressed(stopLoopingPatternDMX);     
}

function createAndShowUIButtons() {
  animationButton      = createButton('Animation editor');
  liveModeButton       = createButton('LIVE MODE');
  layoutEditModeButton = createButton('Layout editor');
  uploadLayoutButton = createFileInput(handleFile);
  animationButton.position(510, 10);
  liveModeButton.position(260, 10);
  layoutEditModeButton.position(10, 10);
  uploadLayoutButton.position(850, 10);  
  animationButton.mousePressed(animationMode); 
  liveModeButton.mousePressed(liveControlMode);
  layoutEditModeButton.mousePressed(layoutEditingMode);  
  animationButton.size(250);
  liveModeButton.size(250);
  layoutEditModeButton.size(250);
}

/* 
 * p5.js mouse event handlers
 */
function mousePressed() {
  if (mode == 0)
    mousePressedLayoutEditingMode();
}

function mouseDragged() {
  if (mode == 0)
    mouseDraggedLayoutEditingMode();
}

function mouseReleased() {
  if (mode == 0)
    mouseReleasedLayoutEditingMode();
}