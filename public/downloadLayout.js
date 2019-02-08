function saveLayout() {
    var layout = {dmxControllers: []};
    for (var d = 0; d < dmxControllers.length; d++) {
      dmxController = dmxControllers[d];
      dmxControllerJson = {type: dmxController.type, number: dmxController.number, universes: []};
      for (var u = 0; u < universes.length; u++){
        universe = universes[u];
        universeJson = {name: universe.name, number: universe.number, fixtures: []};
        for (var f = 0; f < universe.fixtures.length; f++){
          fixture = universe.fixtures[f];
          fixtureJson = {name: fixture.name, number: fixture.number, channels:[], positionX: fixture.x, 
            positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size};
          for (var c = 0; c < fixture.channels.length; c++){
            channel = fixture.channels[c];
            fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
          }
          universeJson['fixtures'].push(fixtureJson);
        }
        dmxControllerJson['universes'].push(universeJson);
      }
      layout['dmxControllers'].push(dmxControllerJson);
    }
    stringifiedLayout = JSON.stringify(layout);
    var d = new Date();
    var filename = 'fixturelayout' + '_' + (d.getMonth()+1).toString() + '_' + d.getDate() + '_' + d.getFullYear() + '.json';
    download(stringifiedLayout, filename, 'json');
  }
  
  // Function to download data to a file
  function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }