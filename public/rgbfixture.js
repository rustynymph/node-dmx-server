var rgbFixtureDeviceTypes = [
  {
    name: 'baisun-led-8-ch', 
    channels: 8, 
    brightnessChannel: 1, 
    redChannel: 2, 
    greenChannel: 3, 
    blueChannel: 4, 
    whiteChannel: 5 
  },
  {
  name: 'coidak-led-8-ch', 
  channels: 8, 
  brightnessChannel: 4, 
  redChannel: 5, 
  greenChannel: 6, 
  blueChannel: 7, 
  whiteChannel: 8 
  }
];

class RGBFixture extends Fixture {
  
  constructor(number) {
      super(number);
      this.color = '#ff0000';
      this.r = 255;
      this.g = 0;
      this.b = 0;
      this.w = 0;
      this.brightness = 255;         
      this.type = rgbFixtureDeviceTypes[0]; // channels below should match specs for default light
      this.numChannels = this.type['channels'];
      this.brightnessChannel = this.type['brightnessChannel'];
      this.redChannel = this.type['redChannel'];
      this.greenChannel = this.type['greenChannel'];
      this.blueChannel = this.type['blueChannel'];
      this.whiteChannel = this.type['whiteChannel'];
      for (var c = 0; c < this.numChannels; c++) {
        this.channels.push(new Channel(this.channels.length));
      }
      this.createUIControls();     
      this.createAnimationUIControls();   
      this.updateBrightness();
      this.updateColor();
  }

  /* Methods for updating RGB fixture parameters */
  updateColor() {
      if (mode == 0)
        this.color = this.colorpicker.value();
      else if (mode == 1)
        this.color = this.animationcolorpicker.value();

      this.updateRGBColorChannelValues();
    }
    
  updateBrightness() { 
    if (mode == 0)
    this.brightness = this.brightnesspicker.value();
    else if (mode == 1)
      this.brightness = this.animationbrightnesspicker.value();    

    if (this.channels[this.brightnessChannel-1]) {
        this.channels[this.brightnessChannel-1].value = this.brightness;
    }
  }

  updateRGBColorChannelValues() {
    var rgbColor = hexToRgb(this.color);
    this.r = rgbColor['r'];
    this.g = rgbColor['g'];
    this.b = rgbColor['b'];

    if (this.channels[this.redChannel-1]) {
        this.channels[this.redChannel-1].value = this.r;
    }
    if (this.channels[this.greenChannel-1]) {
        this.channels[this.greenChannel-1].value = this.g;
    }
    if (this.channels[this.blueChannel-1]) {
        this.channels[this.blueChannel-1].value = this.b;
    }
  }

  /* Methods for displaying RGB fixture and its components */
  displayComponents() {
      //fill(this.color);
      fill(this.r, this.g, this.b, this.brightness);
      ellipse(this.x, this.y, this.size, this.size);
      this.displayText();
      this.updateComponentPositions();
      
      if (mode == 0) {
        this.displayLayoutEditorComponents();             
      } else {
        this.displayAnimationEditorComponents();            
      }
    }   

  updateComponentPositions() {
    this.nameInput.position(this.x-this.size/4+65, this.y+this.size-20);    
    this.presetDevicePicker.position(this.x-this.size/4+65, this.y+this.size);    
    this.colorpicker.position(this.x-this.size/4, this.y+this.size+44);
    this.brightnesspicker.position(this.x-this.size/4, this.y+this.size+74);  
    this.animationcolorpicker.position(this.x-this.size/4, this.y+this.size+44);      
    this.animationbrightnesspicker.position(this.x-this.size/4, this.y+this.size+74);                 
  }
          
  displayText() {
    fill(255);
    stroke(0);
    textSize(12);
    text('name:', this.x-this.size/4, this.y+this.size-16);  
    text('device:', this.x-this.size/4, this.y+this.size+2);  
    if (mode == 0){

    }
  }

  displayLayoutEditorComponents() {
    this.colorpicker.show();
    this.brightnesspicker.show();
    this.animationcolorpicker.hide();      
    this.animationbrightnesspicker.hide();      
    this.presetDevicePicker.show();
  }

  displayAnimationEditorComponents() {
    this.colorpicker.hide();
    this.brightnesspicker.hide();
    this.animationcolorpicker.show();      
    this.animationbrightnesspicker.show();    
    this.presetDevicePicker.hide();
    //this.animationcolorpicker.value(this.colorpicker.value());
  }
         
  /* Methods for initializing the UI components of the RGB fixture */
  createUIControls() {   
    this.presetDevicePicker = createSelect();
    this.presetDevicePicker.changed( () => this.updateDevicePreset( this.presetDevicePicker['elt'].selectedIndex ));

    for (var key in rgbFixtureDeviceTypes) {
      if (rgbFixtureDeviceTypes.hasOwnProperty(key)){
        this.presetDevicePicker.option(rgbFixtureDeviceTypes[key]['name']);
      }
    }

    this.colorpicker = createColorPicker(this.color);
    this.colorpicker.changed(() => this.updateColor());      
    this.brightnesspicker = createSlider(0, 255, this.brightness);
    this.brightnesspicker.changed(() => this.updateBrightness(this.brightnesspicker.value()));      
  }

  createAnimationUIControls() {
    this.animationcolorpicker = createColorPicker(this.color);
    this.animationcolorpicker.changed(() => this.updateColor());      
    this.animationbrightnesspicker = createSlider(0, 255, this.brightness);
    this.animationbrightnesspicker.changed(() => this.updateBrightness(this.brightnesspicker.value()));      
  }  

  updateColorToShowScene(color) {
    this.color = color;
    var rgbColor = hexToRgb(this.color);
    this.r = rgbColor['r'];
    this.g = rgbColor['g'];
    this.b = rgbColor['b'];        
  }  

  updateDevicePreset(optionIndex) {
    this.type = rgbFixtureDeviceTypes[optionIndex];
    this.brightnessChannel = this.type['brightnessChannel'];
    this.redChannel = this.type['redChannel'];
    this.greenChannel = this.type['greenChannel'];
    this.blueChannel = this.type['blueChannel'];
    this.whiteChannel = this.type['whiteChannel'];
    this.blackoutChannels(); // reset all channels to 0
    this.updateColor();
    this.updateBrightness();
  }

}
