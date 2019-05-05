var path = require("path");
var w = window.screen.width;
var h = window.screen.height;

module.exports = {
  notify(header, body) {
    var options = {
      dir: "ltr",
      icon: "../img/logos.appiconset/logos_32.png",
      body: body
    };

    let n = new Notification(header, options);

    n.onshow = () => {
      // document.createElement("audio");
      // myAud = document.getElementById("audio1");
      // myAud.play();

      setTimeout(function() {
        notification.close();
      }, 5000);
    };
  },

  alert() {},

  maximise() {},

  minimise() {},

  closeWindow() {},

  openWindow(uri, frame = false, width = w, hieght = 75, positionY = h) {
    let app = nw.Window.open(uri, {
      always_on_top: true,
      frame: frame,
      height: hieght,
      width: width,
      show: false,
      // resizable: false,
      y: positionY,
      transparent: true
    });
    return app;
  },

  quitApp() {
    if (confirm("Do you want to quit?")) {
      nw.App.quit();
    }
  }
};
