const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    user = //process.env.USER,
    password = //process.env.PASSWORD,
    dbName = "smartSchedule",
    colName = "schedules";

  mu.connect = () => {
    const client = new MongoClient( `mongodb+srv://${user}:${password}@cluster0-3lhwp.mongodb.net/test?retryWrites=true&w=majority`, {
      useUnifiedTopology: true
    });
    return client.connect();
  };

  mu.schedules={};

  mu.schedules.find = query =>
    mu.connect.then(client =>{
      const schedulesCol = client.db(dbName).collection(colName);
      schedulesCol.insertOne({"name":"Juan"});
      return schedulesCol 
        .find(query)
        .limit(20)
        .sort({ timestap: -1 })
        .toArray()
        .finally(() => client.close());
    });
  // replace the uri string with your connection string.
  return mu;
}

module.exports = MongoUtils();
