var ws = require("./ws");

ws.privateWebsocket(
  [
    {
      method: "subscribeTicker",
      params: {
        symbol: "btcusd".toUpperCase()
      },
      id: "btc"
    }
  ],
  data => {
    return data;
  }
);
