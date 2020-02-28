const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "",
    port = 27017,
    dbName = "",
    conName = "";

  mu.connect = () => {
    const client = new MongoClient( `mongodb://${hostname}:${port}`, {
      useUnifiedTopology: true
    });
    return client.connect();
  };

  // replace the uri string with your connection string.
  const uri = MongoClient.connect(uri, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    console.log("Connected...");
    // perform actions on the collection object
    const db = client.db("smartscheduler");
    const col = db.collection("Users");

    col.insertOne("{test:test}");

    client.close();
  });
}

module.exports = MongoUtils;
