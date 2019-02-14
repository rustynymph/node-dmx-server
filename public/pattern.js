class Pattern {

  constructor() {
      this.scenes = [];
      this.sceneButtons = [];
      this.timeInputs = [];
      this.isLooping = false;
      this.timeIntervalID = null;
      this.timeOuts = [];
  }

  /* to do: need to check and make sure rig is consistently connected and set up */
  saveScene() {
    var scene = new Scene(this.scenes.length);
    for (var f = 0; f < universe.fixtures.length; f++) {
      var fixture = universe.fixtures[f];
      var fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
        positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size, connectedTo: fixture.connectedTo,
            connectedBy: fixture.connectedBy};
        for (var c = 0; c < fixture.channels.length; c++) {
            channel = fixture.channels[c];
            fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
        }
      scene.fixtureInfo.push(fixtureJson);
    }
    this.scenes.push(scene);
    this.addSceneButton(scene);
    this.addSceneTimeInput(scene);
  }
    
  addSceneButton(scene) {
    var btn = createButton('Scene ' + (scene.number+1).toString());
    btn.mousePressed(() => scene.show());
    this.sceneButtons.push(btn);
    var linebreak = document.createElement("br");
    scenesElement['elt'].appendChild(linebreak);
    scenesElement['elt'].appendChild(btn['elt']);   
  }

  addSceneTimeInput(scene) {
    var timeInput = createInput('500');
    timeInput.changed(() => {scene.length = parseInt(timeInput.value())});
    this.timeInputs.push(timeInput);
    var msTextNode = document.createTextNode("ms");
    scenesElement['elt'].appendChild(timeInput['elt']);   
    scenesElement['elt'].appendChild(msTextNode);     
  }

  play() {
    var waittime = 0;
    for (var s = 0; s < this.scenes.length; s++) {
      var scene = this.scenes[s];
      scene.waitAndShow(waittime);
      waittime += scene.length;
    }
    return waittime;
  }    

  loop() {
    var totalwaittime = this.play();
    this.timeIntervalID = setInterval(() => {
      this.play();
    }, totalwaittime); 
  }

  stopLooping() {
    clearInterval(this.timeIntervalID);
    this.timeIntervalID = null; 
  }

}

