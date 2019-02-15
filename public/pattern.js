class Pattern {

  constructor() {
      this.scenes = [];
      this.sceneButtons = [];
      this.timeInputs = [];
      this.deleteSceneButtons = [];
      this.isLooping = false;
      this.timeIntervalID = null;
      this.timeOuts = [];
  }

  /* to do: need to check and make sure rig is consistently connected and set up */
  saveScene() {
    if (!universe.dmxController.out.connectedTo) {
      alert("You must have at least one connected in your fixture to save a scene");
      return;
    }

    var scene = new Scene(this.scenes.length);
    for (var f = 0; f < universe.fixtures.length; f++) {
      var fixture = universe.fixtures[f];
      var fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
        positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size, connectedTo: fixture.connectedTo,
            connectedBy: fixture.connectedBy};
        console.log(fixtureJson);
        for (var c = 0; c < fixture.channels.length; c++) {
            var channel = fixture.channels[c];
            fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
        }
      scene.fixtureInfo.push(fixtureJson);
    }
    this.scenes.push(scene);
    this.addSceneButton(scene);
    this.addRemoveSceneButton(scene);
    this.addSceneTimeInput(scene);
  }
    
  removeScene(scene) {
    if (confirm("Are you sure you want to delete scene #" + parseInt(scene.number+1) + "?")) {
      // delete 
      console.log("deleting shit");
      for (var s = 0; s < this.scenes.length; s++) {
        if (scene.number = s) {
          this.scenes.splice(s);
          this.sceneButtons[s].remove();
          this.timeInputs[s].remove();
          this.deleteSceneButtons[s].remove();
          this.sceneButtons.splice(s);
          this.timeInputs.splice(s);
          this.deleteSceneButtons.splice(s);
        }
      }
    } else {
      // do nothing
    }   
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
    timeInput.size(50);
    timeInput.changed(() => {scene.length = parseInt(timeInput.value())});
    this.timeInputs.push(timeInput);
    var msTextNode = document.createTextNode("ms");
    scenesElement['elt'].appendChild(timeInput['elt']);   
    scenesElement['elt'].appendChild(msTextNode);     
  }

  addRemoveSceneButton(scene) {
    var deletebtn = createButton('X');
    deletebtn['elt'].style.color = 'red';
    deletebtn.mousePressed(() => this.removeScene(scene));
    scenesElement['elt'].appendChild(deletebtn['elt']);  
    this.deleteSceneButtons.push(deletebtn); 
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

