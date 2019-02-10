
class RGBFixture extends Fixture {
    constructor(number) {
        super(number);
        this.color = '#ff0000';
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.w = 0;
        this.brightness = 255;         
        this.brightnessChannel = 0;
        this.redChannel = 1;
        this.greenChannel = 2;
        this.blueChannel = 3;
        this.whiteChannel = 4;          
        this.colorpicker = createColorPicker(this.color);
        this.colorpicker.position(this.x/4, this.y+this.size+25);
        this.colorpicker.changed(() => this.updateColor());      
        this.brightnesspicker = createSlider(0, 255, this.brightness);
        this.brightnesspicker.position(this.x/4, this.y+this.size+50);
        this.brightnesspicker.changed(() => this.updateBrightness(this.brightnesspicker.value()));    
        this.redChannelInput = createInput(this.redChannel);
        this.redChannelInput.position(this.x-this.size/4+65, this.y+this.size+44);
        this.redChannelInput.changed(() => this.updateRedChannelNumber(this.brightnesspicker.value()));       
        this.redChannelInput.size(15);                                                   
        this.greenChannelInput = createInput(this.greenChannel);
        this.greenChannelInput.position(this.x-this.size/4+65, this.y+this.size+64);
        this.greenChannelInput.changed(() => this.updateGreenChannelNumber(this.brightnesspicker.value()));    
        this.greenChannelInput.size(15);                                                   
        this.blueChannelInput = createInput(this.blueChannel);
        this.blueChannelInput.position(this.x-this.size/4+65, this.y+this.size+84);
        this.blueChannelInput.changed(() => this.updateBlueChannelNumber(this.brightnesspicker.value()));     
        this.blueChannelInput.size(15);                                                   
        this.whiteChannelInput = createInput(this.whiteChannel);
        this.whiteChannelInput.position(this.x-this.size/4+65, this.y+this.size+104);
        this.whiteChannelInput.changed(() => this.updateWhiteChannelNumber(this.brightnesspicker.value()));   
        this.whiteChannelInput.size(15);                                                   
        this.brightnessChannelInput = createInput(this.brightnessChannel);
        this.brightnessChannelInput.position(this.x-this.size/4+65, this.y+this.size+124);
        this.brightnessChannelInput.changed(() => this.updateBrightnessChannelNumber(this.brightnesspicker.value()));    
        this.brightnessChannelInput.size(15);                                                   
        this.channels[this.brightnessChannel].value = 255;
        this.channels[this.redChannel].value = 255;
        this.channels[this.greenChannel].value = 0;
        this.channels[this.blueChannel].value = 0;        
    }

    updateColor() {
        this.color = this.colorpicker.value();
        var rgbColor = hexToRgb(this.color);
        this.r = rgbColor['r'];
        this.g = rgbColor['g'];
        this.b = rgbColor['b'];
        this.channels[this.redChannel].value = this.r;
        this.channels[this.greenChannel].value = this.g;
        this.channels[this.blueChannel].value = this.b;
      }
    
      updateBrightness() { 
          this.brightness = this.brightnesspicker.value(); 
          this.channels[this.brightnessChannel].value = this.brightness;
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
            text('master brightness:', this.x-this.size/4, this.y+this.size+124);  
          }

          updateBrightnessChannelNumber(channelNumber) {
            this.brightnessChannel = channelNumber;
            this.updateColor();
            this.updateBrightness();
          }

          updateRedChannelNumber(channelNumber) {
            this.redChannel = channelNumber;
            this.updateColor();
            this.updateBrightness();
          }        

          updateGreenChannelNumber(channelNumber) {
            this.greenChannel = channelNumber;
            this.updateColor();
            this.updateBrightness();
          }

          updateBlueChannelNumber(channelNumber) {
            this.blueChannel = channelNumber;
            this.updateColor();
            this.updateBrightness();
          }
           
          updateWhiteChannelNumber(channelNumber) {
            this.whiteChannel = channelNumber;
            updateColor();
            updateBrightness();
          }          

}
