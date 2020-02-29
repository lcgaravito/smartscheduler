const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    user = "";//process.env.USER,
    password = "";//process.env.PASSWORD,
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
    mu.connect().then(client => {
      console.log("Entró al find de MongoUtils")
      const schedulesCol = client.db(dbName).collection(colName);
      return schedulesCol 
        .find(query)
        .limit(20)
        .sort({ timestap: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.schedules.insertSchedule = query =>
  mu.connect().then(client => {
    console.log("Entró al find de MongoUtils")
    const schedulesCol = client.db(dbName).collection(colName);
    return schedulesCol 
      .find(query)
      .sort({ timestap: -1 })
      .toArray()
      .finally(() => client.close());
  });

  return mu;
}

module.exports = MongoUtils();
