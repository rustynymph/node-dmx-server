
class Fixture {
  constructor(number) {
    this.number = number
    this.name = 'Fixture' + this.number.toString();
    this.numChannels = 8;
    this.channels = [];
    for (var i = 0; i < 8; i++) {
      this.channels.push(new Channel());
    }
    this.size = 75;
    this.radius = this.size/2;
    this.x = 100+this.size;      
    this.y = 100+this.size;
    this.hovered = false;   
    this.beingDragged = false;
    this.xOffset = 0; 
    this.yOffset = 0; 
    this.color = '#ff0000';
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.brightness = 255;    
    this.locked = false;
    this.nameInput = createInput(this.name);
    this.nameInput.position(this.x/4, this.y+this.size-20);
    this.nameInput.changed(() => this.updateName());    
    this.channelsInput = createInput('8');
    this.channelsInput.position(this.x/4, this.y+this.size)
    this.channelsInput.changed(() => this.updateChannelNumber());        
    this.colorpicker = createColorPicker(this.color);
    this.colorpicker.position(this.x/4, this.y+this.size+25);
    this.colorpicker.changed(() => this.updateColor());      
    //this.colorpicker.changed(this.updateColor); 
    this.brightnesspicker = createSlider(0, 255, this.brightness);
    this.brightnesspicker.position(this.x/4, this.y+this.size+50);
    this.brightnesspicker.changed(() => this.updateBrightness());    
    this.in = new FixtureIn(this);  
    this.out = new FixtureOut(this);
    this.startingAddress = 0;
  }

  display() {
    // check if being hovered or dragged
    if (this.isHovered()) stroke(255); 
    else stroke(0);
    this.displayComponents();
  }

  displayComponents() {
    //fill(this.color);
    fill(this.r, this.g, this.b, this.brightness);
    ellipse(this.x, this.y, this.size, this.size);
    this.nameInput.position(this.x-this.size/4, this.y+this.size-20);
    this.channelsInput.position(this.x-this.size/4, this.y+this.size);
    this.colorpicker.position(this.x-this.size/4, this.y+this.size+20);
    this.brightnesspicker.position(this.x-this.size/4, this.y+this.size+50);
    this.in.display();
    this.out.display();
  }

  isHovered() {
    if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
      mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
    else return false;
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
    var rgbColor = hexToRgb(this.color);
    this.r = rgbColor['r'];
    this.g = rgbColor['g'];
    this.b = rgbColor['b'];
    //this.redChannel.value = rgbColor['r'];
    //this.greenChannel.value = rgbColor['g'];
    //this.blueChannel.value = rgbColor['b'];
  }

  updateBrightness() { this.brightness = this.brightnesspicker.value(); }
  updateName() { this.name = this.nameInput.value(); }
  updateChannelNumber() { this.numChannels = this.channelsInput.value(); }  
}

class FixtureIn {
    constructor(parent) {
        this.parent = parent;
        this.x = this.parent.x-this.parent.size/2-this.size/2;
        this.y = this.parent.y;
        this.size = 15;
        this.radius = this.size/2;
        this.isDragged = false;
        this.isConnectingAWire = false;
        this.type = 'in';
        this.connectedTo = null;  
        this.connectedBy = null;   
    }

    display() {
        fill(100);
        // check if being hovered or dragged
        if (this.isHovered()) stroke(255); 
        else stroke(0);        
        ellipse(this.parent.x-this.parent.size/2-this.size/2, this.parent.y, this.size, this.size);        
    }

    isHovered() {
        this.x = this.parent.x-this.parent.size/2-this.size/2;
        this.y = this.parent.y;        
        if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
          mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
        else return false;
      }
    
      pressed() {
        if(this.isHovered() && (!locked || this.locked)) { 
          fill(255, 255, 255);
          locked = true;
          this.locked = true;
        }
      }
      
      dragged() {
        if (locked && this.locked){
            this.isDragged = true;
          // draw a line or something
        }
      }
      
      released() {
        this.locked = false;
        locked = false;
        this.isDragged = false;
        this.isConnectingAWire = false;        
      }  
      
      connectingAWire() {
        if (this.isDragged) return true;
        else false;
    }

    updateConnectedTo(thing) {
        this.connectedTo = thing;
    }

    updateConnectedBy(thing) {
        this.connectedBy = thing;
    } 
    
}

class FixtureOut {
    constructor(parent) {
        this.parent = parent;
        this.x = this.parent.x+this.parent.size/2+this.size/2;
        this.y = this.parent.y;
        this.size = 15;
        this.radius = this.size/2;
        this.isDragged = false;
        this.isConnectingAWire = false;   
        this.type = 'out';     
        this.connectedTo = null;   
        this.connectedBy = null;  
    }

    display() {
        fill(100);
        // check if being hovered or dragged
        if (this.isHovered()) stroke(255); 
        else stroke(0);         
        ellipse(this.parent.x+this.parent.size/2+this.size/2, this.parent.y, this.size, this.size);
    }

    isHovered() {
        this.x = this.parent.x+this.parent.size/2+this.size/2;
        this.y = this.parent.y;        
        if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
          mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
        else return false;
      }
    
      pressed() {
        if(this.isHovered() && (!locked || this.locked)) { 
          fill(255, 255, 255);
          locked = true;
          this.locked = true;
          stroke(255);
          line(this.x, this.y, 100, 100); //test           
        }
      }
      
      dragged() {
        if (locked && this.locked){
            this.isDragged = true;
          // draw a line or something
        }
      }
      
      released() {
        this.locked = false;
        locked = false;
        this.isDragged = false;
        this.isConnectingAWire = false;        
      }  
      
      connectingAWire() {
        if (this.isDragged) return true;
        else false;
    } 

    updateConnectedTo(thing) {
        this.connectedTo = thing;
    }

    updateConnectedBy(thing) {
        this.connectedBy = thing;
    }    
}