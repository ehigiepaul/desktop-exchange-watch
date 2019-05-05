var ws = require("./ws");

var indicate = {
  ask: "466.70",
  bid: "464.83",
  last: "466.22",
  open: "488.34",
  low: "443.14",
  high: "493.45",
  volume: "5421.737",
  volumeQuote: "2552384.97697",
  timestamp: "2018-02-18T22:08:37.487Z",
  symbol: "ZECUSD"
};

// ws.privateWebsocket(
//   [
//     {
//       method: "subscribeTicker",
//       params: {
//         symbol: "ethusd"
//       },
//       id: "zec"
//     }
//   ],
//   data => {
//     if (!data.id) {
//       if (indicate[0].last < data.params.last) {
//         console.log(indicate[0].last);
//         console.log(data.params.last + " up");
//       } else if (indicate[0].last == data.params.last) {
//       } else {
//         console.log(indicate[0].last);
//         console.log(data.params.last + " down");
//       }

//       indicate.splice(0, 1, data.params);
//       // console.log(data);
//       return data;
//     }
//   }
// );

var fav = [
  "BTC",
  "ETH",
  "DOGE",
  "dcn",
  "air",
  "ltc",
  "b2x",
  "zec",
  "etc",
  "xrp"
];
var sendFav = [];

for (i in fav) {
  sendFav.push({
    method: "subscribeTicker",
    params: {
      symbol: fav[i] + "usd"
    },
    id: fav[i]
  });
}

var ticket = [];

ws.privateWebsocket(sendFav, data => {
  if (!data.id) {
    for (i in fav) {
      if (fav[i] + "USD" == data.params.symbol) {
        console.log(data.params);
      }
    }
  }
});
