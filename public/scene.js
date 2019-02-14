class Scene {

  constructor(number) {
    this.number = number;
    this.fixtureInfo = [];
    this.length = -1; // -1 is infinite
    this.length = 500; // ms that a scene should show for
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

}