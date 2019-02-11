function generateOrderedChannelsList() {
    var channelsList = {};
    var startingAddress = 1; // starting address of dmx controllers begin at 1, not 0
    var node = dmxController.out.connectedTo.parent;
    while (node) {
        node.startingAddress = startingAddress;
        for (var c = 0; c < node.channels.length; c++) {
            channelsList[startingAddress + c] = node.channels[c].value;
        }
        startingAddress = startingAddress + node.channels.length;
        if (node.out && node.out.connectedTo && node.out.connectedTo.parent) {
            node = node.out.connectedTo.parent;
        } else {
            node = null;
        }
    }
    console.log(channelsList);
    return channelsList;
}

function dmxInfoToJson(allChannels) {
    return {dmxControllerType: dmxController.type, universeName: universe.name, channels: allChannels};
}

function layoutToJson() {
    var layout = {dmxControllers: [{type: dmxController.type, number: dmxController.number,
                     positionX: dmxController.x,  positionY: dmxController.y, universes: []}],
                  universes: [{name: universe.name, number: universe.number, fixtures: []}]};
    for (var f = 0; f < universe.fixtures.length; f++){
        fixture = universe.fixtures[f];
        fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
        positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size};
        for (var c = 0; c < fixture.channels.length; c++){
            channel = fixture.channels[c];
            fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
        }
        layout['universes'][0]['fixtures'].push(fixtureJson);
    }
    return layout;
}

function saveProject() {
    var channelsList = generateOrderedChannelsList();
    var dmxInfo = dmxInfoToJson(channelsList);
    updateServer(dmxInfo);
    var layout = layoutToJson();
    stringifiedLayout = JSON.stringify(layout);
    var d = new Date();
    var filename = 'fixturelayout' + '_' + (d.getMonth()+1).toString() + '_' + d.getDate() + '_' + d.getFullYear() + '.json';
    download(stringifiedLayout, filename, 'json');
  }
  
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

function updateServer(dmxInfo) {  // send the server the updated rig information
    socket.emit('dmx-updated', dmxInfo);
}

/*
 Eventually I will implement functions to take the layout and animations and turn them into makecode blocks,
 then the makecode pi will take care of the node-dmx updating
*/