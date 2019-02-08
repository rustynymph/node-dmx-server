class DMXController {
    constructor(controllerType, number) {
      this.type = controllerType;
      this.number = number;
      this.universes = [];
      this.locked = false;
      this.size = 80;
      this.x = 100+this.size;      
      this.y = 100+this.size;
      this.hovered = false;   
      this.beingDragged = false;
      this.xOffset = 0; 
      this.yOffset = 0;     
      this.out = new DMXControllerOut(this);
      this.controllerTypeSelector = createSelect();
      this.controllerTypeSelector.position(this.x, this.y+this.size+10);
      for (var c = 0; c < DMXControllerOptions.length; c++) {
        this.controllerTypeSelector.option(DMXControllerOptions[c]);
      }
      this.controllerTypeSelector.changed(() => this.updateControllerType(this.controllerTypeSelector.value()));
    }
  
    display() {
      // check if being hovered or dragged
      fill(180);
      if (this.isHovered()) stroke(255); 
      else stroke(0);
      rect(this.x, this.y, this.size, this.size);
      this.controllerTypeSelector.position(this.x, this.y+this.size+10);
      this.out.display();
      fill(0);
      stroke(0);
      text('DMX', this.x+this.size/2, this.y+this.size/2);
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

    updateControllerType(controllerType) {
        this.type = controllerType;
    }   
    
    getControllerType() {
        return this.type;
    }
  
}


class DMXControllerOut {
    constructor(parent) {
        this.parent = parent;
        this.x = this.parent.x+this.parent.size+this.size/2;
        this.y = this.parent.y+this.parent.size/2;
        this.size = 15;
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
       ellipse(this.parent.x+this.parent.size+this.size/2, this.parent.y+this.parent.size/2, this.size, this.size);    
    }

    isHovered() {
        this.x = this.parent.x+this.parent.size+this.size/2;
        this.y = this.parent.y+this.parent.size/2;     
        if (mouseX > this.x-this.size && mouseX < this.x+this.size && 
          mouseY > this.y-this.size && mouseY < this.y+this.size) return true;
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