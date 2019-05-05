var nw = require("nw.gui");
let win = nw.Window.get();
var utility = require("../utilities");

new Vue({
  el: "#app",
  data() {
    return {};
  },
  methods: {
    quit() {
      utility.closeWindow();
    },
    save() {}
  },
  mounted() {
    win.show();
    win.zoomLevel = 0;
    win.showDevTools();
  },
  destroyed() {
    win.on("close", () => {
      this.close();
    });
  }
});
