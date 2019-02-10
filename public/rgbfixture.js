
class RGBFixture extends Fixture {
    constructor(number) {
        super(number);
        this.color = '#ff0000';
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.brightness = 255;           
        this.colorpicker = createColorPicker(this.color);
        this.colorpicker.position(this.x/4, this.y+this.size+25);
        this.colorpicker.changed(() => this.updateColor());      
        this.brightnesspicker = createSlider(0, 255, this.brightness);
        this.brightnesspicker.position(this.x/4, this.y+this.size+50);
        this.brightnesspicker.changed(() => this.updateBrightness());            
        this.brightnessChannel = 0;
        this.redChannel = 1;
        this.greenChannel = 2;
        this.BlueChannel = 3;
        this.channels[this.brightnessChannel].value = 255;
        this.channels[this.redChannel].value = 255;
        this.channels[this.greenChannel].value = 0;
        this.channels[this.BlueChannel].value = 0;        
    }

    updateColor() {
        this.color = this.colorpicker.value();
        var rgbColor = hexToRgb(this.color);
        this.r = rgbColor['r'];
        this.g = rgbColor['g'];
        this.b = rgbColor['b'];
        this.channels[this.redChannel].value = this.r;
        this.channels[this.greenChannel].value = this.g;
        this.channels[this.BlueChannel].value = this.b;
      }
    
      updateBrightness() { 
          this.brightness = this.brightnesspicker.value(); 
          this.channels[this.brightnessChannel].value = this.brightness;
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

}
