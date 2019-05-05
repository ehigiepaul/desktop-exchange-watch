var _ws = require("ws");

var ws = new _ws("wss://api.hitbtc.com/api/2/ws");

module.exports.privateWebsocket = function(message, callback) {
  ws.on("open", () => {
    console.log("am in");
    for (i of message) {
      ws.send(JSON.stringify(i));
    }
  });

  ws.on("message", d => {
    var data = JSON.parse(d);
    var val = callback(data);
    return val;
  });
};
