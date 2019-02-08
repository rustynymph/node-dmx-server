var universe;
var locked = false;

function setup() {
  universe = new Universe();

  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  // cnv.style('display', 'block');
  canvas.parent('fixture-editor');

  fixtureButton = createButton('Add fixture');
  fixtureButton.position(10, 10);
  fixtureButton.mousePressed(addFixture);
}

function draw() { 
  background(0);
  for (let i = 0; i < universe.fixtures.length; i++) {
    universe.fixtures[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < universe.fixtures.length; i++) {
    var fixture = universe.fixtures[i]
    if (fixture.isHovered()) {
      fixture.pressed();
    }
  }
}

function mouseDragged() {
  for (let i = 0; i < universe.fixtures.length; i++) {
    var fixture = universe.fixtures[i]
    if (fixture.isHovered()) {
      fixture.dragged();
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < universe.fixtures.length; i++) {
    universe.fixtures[i].released();
  }
}

function addFixture() {
  universe.addFixture(new Fixture(universe.fixtures.length));
}

class Universe {
  constructor() {
    this.name = "";
    this.numFixtures = 0;
    this.fixtures = [];
  }

  addFixture(fixture) {
    this.fixtures.push(fixture);
  }
}

class Fixture {
  constructor(number) {
    this.name = '';
    this.number = number
    this.numChannels = 8;
    this.channels = [];
    for (var i = 0; i < 8; i++) {
      this.channels.push(new Channel());
    }
    this.size = 75;
    this.x = this.size;      
    this.y = this.size;
    this.hovered = false;   
    this.beingDragged = false;
    this.xOffset = 0; 
    this.yOffset = 0; 
    this.color = '#ff0000';
    this.brightness = 100;    
    this.locked = false;
    this.nameInput = createInput('Fixture' + this.number.toString());
    this.nameInput.position(this.x/4, this.y+this.size-20);
    this.nameInput.changed(() => this.updateName());    
    this.channelsInput = createInput('8');
    this.channelsInput.position(this.x/4, this.y+this.size)
    this.channelsInput.changed(() => this.updateChannelNumber());        
    this.colorpicker = createColorPicker(this.color);
    this.brightnesspicker = createSlider(0, 255, this.brightness);
    this.colorpicker.position(this.x/4, this.y+this.size+25);
    this.colorpicker.changed(() => this.updateColor());      
    //this.colorpicker.changed(this.updateColor); 
    this.brightnesspicker.position(this.x/4, this.y+this.size+50);
    this.brightnesspicker.changed(() => this.updateBrightness());      
  }

  display() {
    // check if being hovered or dragged
    fill(this.color);
    if (this.isHovered()) {
        stroke(255); 
    } else {
      stroke(0);
    }    
    ellipse(this.x, this.y, this.size, this.size);
    this.nameInput.position(this.x-this.size/4, this.y+this.size-20);
    this.channelsInput.position(this.x-this.size/4, this.y+this.size);
    this.colorpicker.position(this.x-this.size/4, this.y+this.size+20);
    this.brightnesspicker.position(this.x-this.size/4, this.y+this.size+50);
  }

  isHovered() {
    if (mouseX > this.x-this.size && mouseX < this.x+this.size && 
      mouseY > this.y-this.size && mouseY < this.y+this.size) {
        return true;
    } else {
      return false;
    }    
  }

  pressed() {
    if(this.isHovered() && (!locked || this.locked)) { 
      fill(255, 255, 255);
      locked = true;
      this.locked = true;
    }
    this.xOffset = mouseX-this.x; 
    this.yOffset = mouseY-this.y; 
  }
  
  dragged() {
    if (locked && this.locked){
      this.x = mouseX-this.xOffset; 
      this.y = mouseY-this.yOffset; 
    }
  }
  
  released() {
    this.locked = false;
    locked = false;
  }  

  updateColor() {
    this.color = this.colorpicker.value();
    rgbColor = hexToRgb(this.color);
    this.redChannel.value = rgbColor['r'];
    this.greenChannel.value = rgbColor['g'];
    this.blueChannel.value = rgbColor['b'];
  }

  updateBrightness() {
    this.brightness = this.brightnesspicker.value();
  }

  updateName() {
    this.name = this.nameInput.value();
  }

  updateChannelNumber() {
    this.numChannels = this.channelsInput.value();
  }  
}

class Channel {
  constructor() {
    this.name = "";
    this.value = 0;
  }
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
