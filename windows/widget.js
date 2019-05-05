var utility = require("../utilities");
var nw = require("nw.gui");
let win = nw.Window.get();
var _ws = require("ws");

var ws = new _ws("wss://api.hitbtc.com/api/2/ws");

var widgetOption = {
  setting: document.querySelector("#widgetSetting"),
  display: document.querySelector("#widgetDisplay"),
  quit: document.querySelector("#widgetQuit")
};

Vue.component("ticker-view", {
  template: `<div class="card" data-pg-collapsed>
  <div class="ticker">
    <div class="currency">
      <p>{{ symbol }}</p>
    </div>
    <div class="changes">
      <p>{{change}}%</p>
    </div>
  </div>
  <div class="value">
    <div class="price">
      <p>{{price}}</p>
    </div>
    <div class="symbol">
      <p>USD</p>
    </div>
  </div>
  <div class="volume" data-pg-collapsed>
    <p>VOL</p>
    <div class="totalVol" data-pg-collapsed>
      <p>{{volume}}</p>
      <p>btc</p>
    </div>
    <div class="ticker"> </div>
  </div>
  <div class="holds">
    <div class="myHold">
      <p>5&nbsp;</p>
      <p>BTC</p>
    </div>
    <div class="myValue">
      <p>3467&nbsp;</p>
      <p>USD</p>
    </div>
  </div>
  </div>`,
  props: ["symbol", "price", "volume", "change"]
});

function privateWebsocket(message, callback) {
  ws.on("open", () => {
    for (i of message) {
      ws.send(JSON.stringify(i));
    }
  });

  ws.on("message", d => {
    var data = JSON.parse(d);
    var val = callback(data);
    // console.log(val);
    return val;
  });
}

var app = new Vue({
  el: "#app",
  data: {
    connected: false,
    tickers: [],
    signal: [],
    fav: ["BTC", "ETH", "DOGE", "dcn", "air", "ltc", "b2x", "zec", "etc", "xrp"]
  },
  methods: {
    quit() {
      utility.quitApp();
    },
    hide() {
      var cardView = document.querySelector(".cardView");

      cardView.classList.toggle("hide");
      if (cardView.classList.value.match("hide")) {
        setTimeout(() => {
          win.width = 115;
        }, 1000);
      } else {
        win.width = window.screen.width;
      }
    },
    setting() {
      utility.openWindow(
        "windows/setting.html",
        false,
        430,
        300,
        window.screen.height - 500
      );
    },
    btcVol(symbol, volume, price) {
      if (symbol.slice(0, symbol.length - 3) !== "BTC") {
        return (volume * price / this.tickers[0].last).toFixed(4);
      } else {
        return volume;
      }
    }
  },
  created() {
    win.show();
    win.zoomLevel = -1;
    win.showDevTools();

    var sendFav = [];

    for (i of this.fav) {
      sendFav.push({
        method: "subscribeTicker",
        params: {
          symbol: i + "usd"
        },
        id: i
      });
    }

    function indicator(color, i) {
      switch (color) {
        case "red":
          document.getElementsByClassName("card")[i].classList.toggle("red");

          setTimeout(() => {
            document.getElementsByClassName("card")[i].classList.toggle("red");
          }, 500);
          break;
        case "green":
          document.getElementsByClassName("card")[i].classList.toggle("green");

          setTimeout(() => {
            document
              .getElementsByClassName("card")
              [i].classList.toggle("green");
          }, 500);
          break;

        default:
          break;
      }
    }

    privateWebsocket(sendFav, data => {
      if (!data.id) {
        for (i in this.fav) {
          if ((this.fav[i] + "usd").toUpperCase() == data.params.symbol) {
            this.tickers.splice(i, 1, data.params);

            if (this.signal[i] < data.params.last) {
              // console.log(this.fav[i] + " up");
              // indicator("green", id);
            } else {
              // console.log(this.fav[i] + " down");
              // indicator("red", id);
            }
            this.signal.splice(i, 1, data.params.last);
          }
        }
      }
    });
  },

  destroyed() {
    win.on("close", () => {
      this.close();
    });
  },
  updated() {}
});
