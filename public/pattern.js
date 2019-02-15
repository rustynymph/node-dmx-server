class Pattern {

  constructor() {
      this.scenes = [];
      this.isLooping = false;
      this.timeIntervalID = null;
  }

  /* to do: need to check and make sure rig is consistently connected and set up */
  saveScene() {
    if (!universe.dmxController.out.connectedTo) {
      alert("You must have at least one connected in your fixture to save a scene");
      return;
    }

    var scene = new Scene(this, this.scenes.length);
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
  }
    
  removeScene(sceneNumber) {
    if (confirm("Are you sure you want to delete scene #" + parseInt(sceneNumber+1) + "?")) {
      // delete 
      console.log("deleting shit");
      for (var s = 0; s < this.scenes.length; s++) {
        if (sceneNumber == s) {
          this.scenes[s].removeUIElements();
          this.scenes.splice(s, 1);
        }
      }
      this.renumberScenes();
    } else {
      // do nothing
    }   
  }

  renumberScenes() {
    for (var i = 0; i < this.scenes.length; i++) {
      console.log ("old: " + this.scenes[i].number + " new: " + i);
      this.scenes[i].number = i;
      this.scenes[i].deleteButton.mousePressed(() => this.removeScene(i));
      console.log(this.scenes[i].selectButton['elt'].value);
      this.scenes[i].selectButton['elt'].value = 'Scene ' + parseInt(i+1);
    }
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

