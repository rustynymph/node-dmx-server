
class RGBFixture extends Fixture {
    constructor(number) {
        super(number);
        this.color = '#ff0000';
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.w = 0;
        this.brightness = 255;         
        this.brightnessChannel = null;
        this.redChannel = null;
        this.greenChannel = null;
        this.blueChannel = null;
        this.whiteChannel = null;          
        this.colorpicker = createColorPicker(this.color);
        this.colorpicker.position(this.x/4, this.y+this.size+25);
        this.colorpicker.changed(() => this.updateColor());      
        this.brightnesspicker = createSlider(0, 255, this.brightness);
        this.brightnesspicker.position(this.x/4, this.y+this.size+50);
        this.brightnesspicker.changed(() => this.updateBrightness(this.brightnesspicker.value()));    
        this.redChannelInput = createSelect();
        this.redChannelInput.position(this.x-this.size/4+65, this.y+this.size+44);
        this.redChannelInput.changed(() => this.updateRedChannelNumber(this.redChannelInput.value()));    
        this.greenChannelInput = createSelect();
        this.greenChannelInput.position(this.x-this.size/4+65, this.y+this.size+64);
        this.greenChannelInput.changed(() => this.updateGreenChannelNumber(this.greenChannelInput.value()));    
        this.blueChannelInput = createSelect();
        this.blueChannelInput.position(this.x-this.size/4+65, this.y+this.size+84);
        this.blueChannelInput.changed(() => this.updateBlueChannelNumber(this.blueChannelInput.value()));     
        this.whiteChannelInput = createSelect();
        this.whiteChannelInput.position(this.x-this.size/4+65, this.y+this.size+104);
        this.whiteChannelInput.changed(() => this.updateWhiteChannelNumber(this.whiteChannelInput.value()));   
        this.brightnessChannelInput = createSelect();
        this.brightnessChannelInput.position(this.x-this.size/4+65, this.y+this.size+124);
        this.brightnessChannelInput.changed(() => this.updateBrightnessChannelNumber(this.brightnessChannelInput.value()));    
        /*this.channels[this.brightnessChannel].value = 255;
        this.channels[this.redChannel].value = 255;
        this.channels[this.greenChannel].value = 0;
        this.channels[this.blueChannel].value = 0;     */   
    }

    updateColor() {
        this.color = this.colorpicker.value();
        var rgbColor = hexToRgb(this.color);
        this.r = rgbColor['r'];
        this.g = rgbColor['g'];
        this.b = rgbColor['b'];
        console.log(this.channels);
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
    
      updateBrightness() { 
          this.brightness = this.brightnesspicker.value(); 
            if (this.channels[this.brightnessChannel-1]) {
                this.channels[this.brightnessChannel-1].value = this.brightness;
            }
        }

        displayComponents() {
            //fill(this.color);
            fill(this.r, this.g, this.b, this.brightness);
            ellipse(this.x, this.y, this.size, this.size);
            this.displayText();
            this.nameInput.position(this.x-this.size/4+65, this.y+this.size-20);            
            this.channelsInput.position(this.x-this.size/4+65, this.y+this.size);
            this.redChannelInput.position(this.x-this.size/4+65, this.y+this.size+44);
            this.greenChannelInput.position(this.x-this.size/4+65, this.y+this.size+64);
            this.blueChannelInput.position(this.x-this.size/4+65, this.y+this.size+84);
            this.whiteChannelInput.position(this.x-this.size/4+65, this.y+this.size+104);
            this.brightnessChannelInput.position(this.x-this.size/4+65, this.y+this.size+124);
            this.colorpicker.position(this.x-this.size/4, this.y+this.size+144);
            this.brightnesspicker.position(this.x-this.size/4, this.y+this.size+174);
            this.in.display();
            this.out.display();
          }   
          
          displayText() {
            fill(255);
            stroke(0);
            textSize(12);
            text('name:', this.x-this.size/4, this.y+this.size-16);  
            text('channels:', this.x-this.size/4, this.y+this.size+4);  
            text('preset channel info:', this.x-this.size/4, this.y+this.size+24);  
            text('red:', this.x-this.size/4, this.y+this.size+44);  
            text('green:', this.x-this.size/4, this.y+this.size+64);  
            text('blue:', this.x-this.size/4, this.y+this.size+84);  
            text('white:', this.x-this.size/4, this.y+this.size+104);  
            text('brightness:', this.x-this.size/4, this.y+this.size+124);  
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
            console.log(this.redChannelInput['elt']);
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

}
