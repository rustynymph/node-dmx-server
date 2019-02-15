var rgbFixtureDeviceTypes = [
  {
    name: 'baisun-led-8-ch', 
    channels: 8, 
    brightnessChannel: 1, 
    redChannel: 5, 
    greenChannel: 6, 
    blueChannel: 7, 
    whiteChannel: 8 
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
      this.brightnessChannel = 1;
      this.redChannel = 5;
      this.greenChannel = 6;
      this.blueChannel = 7;
      this.whiteChannel = 8;
      this.createUIControls();     
      this.createAnimationUIControls();   
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

  updateBrightnessChannelNumber(channelNumber) {
    this.channels[this.brightnessChannel - 1].value = 0;
    this.brightnessChannel = channelNumber;
    this.updateColor();
    this.updateBrightness();
  }

  updateRedChannelNumber(channelNumber) {
    this.channels[this.redChannel - 1].value = 0;
    this.redChannel = channelNumber;
    this.updateColor();
    this.updateBrightness();
  }        

  updateGreenChannelNumber(channelNumber) {
    this.channels[this.greenChannel - 1].value = 0;
    this.greenChannel = channelNumber;
    this.updateColor();
    this.updateBrightness();
  }

  updateBlueChannelNumber(channelNumber) {
    this.channels[this.blueChannel - 1].value = 0;
    this.blueChannel = channelNumber;
    this.updateColor();
    this.updateBrightness();
  }
    
  updateWhiteChannelNumber(channelNumber) {
    this.channels[this.whiteChannel - 1].value = 0;
    this.whiteChannel = channelNumber;
    this.updateColor();
    this.updateBrightness();
  } 
          
  updateChannelNumber() { 
    this.numChannels = this.channelsInput.value();
    this.channels = [];
    this.redChannelInput['elt'].innerHTML = '';
    for (var i = 0; i < this.numChannels; i++) {
      this.channels.push(new Channel(i+1));
      this.redChannelInput.option(i+1);
      this.greenChannelInput.option(i+1);
      this.blueChannelInput.option(i+1);
      this.whiteChannelInput.option(i+1);
      this.brightnessChannelInput.option(i+1);
    }
      this.redChannel = 1;
      this.greenChannel = 1;
      this.blueChannel = 1;
      this.whiteChannel = 1;
      this.brightnessChannel = 1;
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
    //this.channelsInput.position(this.x-this.size/4+65, this.y+this.size);
    /*this.redChannelInput.position(this.x-this.size/4+65, this.y+this.size+44);
    this.greenChannelInput.position(this.x-this.size/4+65, this.y+this.size+64);
    this.blueChannelInput.position(this.x-this.size/4+65, this.y+this.size+84);
    this.whiteChannelInput.position(this.x-this.size/4+65, this.y+this.size+104);
    this.brightnessChannelInput.position(this.x-this.size/4+65, this.y+this.size+124);*/
    //this.colorpicker.position(this.x-this.size/4, this.y+this.size+144);
    //this.brightnesspicker.position(this.x-this.size/4, this.y+this.size+174);  
    //this.animationcolorpicker.position(this.x-this.size/4, this.y+this.size);      
    //this.animationbrightnesspicker.position(this.x-this.size/4, this.y+this.size+44);    
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
      /*text('channels:', this.x-this.size/4, this.y+this.size+4);  
      text('preset channel info:', this.x-this.size/4, this.y+this.size+24);  
      text('red:', this.x-this.size/4, this.y+this.size+44);  
      text('green:', this.x-this.size/4, this.y+this.size+64);  
      text('blue:', this.x-this.size/4, this.y+this.size+84);  
      text('white:', this.x-this.size/4, this.y+this.size+104);  
      text('brightness:', this.x-this.size/4, this.y+this.size+124);  */
    }
  }

  displayLayoutEditorComponents() {
    /*this.channelsInput.show();
    this.redChannelInput.show();
    this.greenChannelInput.show();
    this.blueChannelInput.show();
    this.whiteChannelInput.show();
    this.brightnessChannelInput.show();*/
    this.colorpicker.show();
    this.brightnesspicker.show();
    this.animationcolorpicker.hide();      
    this.animationbrightnesspicker.hide();      
    this.presetDevicePicker.show();
  }

  displayAnimationEditorComponents() {
    /*this.channelsInput.hide();
    this.redChannelInput.hide();
    this.greenChannelInput.hide();
    this.blueChannelInput.hide();
    this.whiteChannelInput.hide();
    this.brightnessChannelInput.hide();*/
    this.colorpicker.hide();
    this.brightnesspicker.hide();
    this.animationcolorpicker.show();      
    this.animationbrightnesspicker.show();    
    this.presetDevicePicker.hide();
    //this.animationcolorpicker.value(this.colorpicker.value());
  }
         
  /* Methods for initializing the UI components of the RGB fixture */
  createUIControls() {   
    /*this.redChannelInput = createSelect();
    this.redChannelInput.changed(() => this.updateRedChannelNumber(this.redChannelInput.value()));    
    this.greenChannelInput = createSelect();
    this.greenChannelInput.changed(() => this.updateGreenChannelNumber(this.greenChannelInput.value()));    
    this.blueChannelInput = createSelect();
    this.blueChannelInput.changed(() => this.updateBlueChannelNumber(this.blueChannelInput.value()));     
    this.whiteChannelInput = createSelect();
    this.whiteChannelInput.changed(() => this.updateWhiteChannelNumber(this.whiteChannelInput.value()));   
    this.brightnessChannelInput = createSelect();
    this.brightnessChannelInput.changed(() => this.updateBrightnessChannelNumber(this.brightnessChannelInput.value())); */ 

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
    this.channels[this.brightnessChannel] = this.brightnesspicker.value();
    this.channels[this.redChannel] = this.r;
    this.channels[this.greenChannel] = this.g;
    this.channels[this.blueChannel] = this.b;
  }

}
