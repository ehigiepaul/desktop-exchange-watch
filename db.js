var _db = require("pouchdb");

var db = new _db("./store");

async function setting() {
  try {
    var setting = await db.put({
      _id: "setting",
      options: {
        position: "",
        apiKey: "",
        favorite: []
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// if (db.get("setting")) {
//   db.get("setting").catch(mes => {
//     console.log(mes);
//   });
// } else {
//   console.log("created");
// }

db
  .get("setting")
  .then(mes => {
    console.log("setting ok");
  })
  .catch(err => {
    setting();
  });
