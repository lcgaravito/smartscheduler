const MongoClient = require("mongodb").MongoClient;
const MongoUtils = function() {
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
};

module.exports = MongoUtils;
