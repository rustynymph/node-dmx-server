class Scene {

  constructor(parent, number) {
    this.parent = parent;
    this.number = number;
    this.fixtureInfo = [];
    this.length = -1; // -1 is infinite
    this.length = 500; // ms that a scene should show for
    this.createUIElements();
  }

  show() {
    for (var f = 0; f < this.fixtureInfo.length; f++) { 
      var fixtureSavedState = this.fixtureInfo[f];
      for (var i = 0; i < universe.fixtures.length; i++) {
        var fixture = universe.fixtures[i];
        if (fixture.number == fixtureSavedState['number']) {
          fixture.updateColorToShowScene(fixtureSavedState['color']);
          fixture.animationcolorpicker.value(fixtureSavedState['color']); // update color picker to match updated color
        }
      }
    }
  }

  waitAndShow(wait) { 
    setTimeout(() => {this.show();}, wait);
  }

  createUIElements() {
    this.linebreakElement = document.createElement("br");
    scenesElement['elt'].appendChild(this.linebreakElement);

    this.selectButton = createButton('Scene ' + (this.number+1).toString());
    this.selectButton.mousePressed(() => this.show());
    scenesElement['elt'].appendChild(this.selectButton['elt']);   

    this.deleteButton = createButton('X');
    this.deleteButton['elt'].style.color = 'red';
    this.deleteButton.mousePressed(() => this.parent.removeScene(this.number));
    scenesElement['elt'].appendChild(this.deleteButton['elt']);  

    this.timeInput = createInput('500');
    this.timeInput.size(50);
    this.timeInput.changed(() => {this.length = parseInt(this.timeInput.value())});
    scenesElement['elt'].appendChild(this.timeInput['elt']);   

    this.msTextElement = document.createTextNode("ms");
    scenesElement['elt'].appendChild(this.msTextElement);     
  }

  removeUIElements() {
    scenesElement['elt'].removeChild(this.linebreakElement);
    scenesElement['elt'].removeChild(this.selectButton['elt']);   
    scenesElement['elt'].removeChild(this.deleteButton['elt']);  
    scenesElement['elt'].removeChild(this.timeInput['elt']);   
    scenesElement['elt'].removeChild(this.msTextElement);     
  }

}
