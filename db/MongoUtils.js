const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    user = "vaca";//process.env.USER,
    password = "vaca123";//process.env.PASSWORD,
    dbName = "smartSchedule",
    colName = "schedules";

  mu.connect = () => {
    const client = new MongoClient( `mongodb+srv://${user}:${password}@cluster0-3lhwp.mongodb.net/test?retryWrites=true&w=majority`, {
      useUnifiedTopology: true
    });
    return client.connect();
  };

  // All of processes related to schedules
  mu.schedules={};

  // Find items in schedules collection
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

  // Find schedule by one user
  mu.schedules.findByOneUser = user =>
    mu.connect().then(client => {
      const schedule = client.db(dbName).collection(colName);

      // when searching by id we need to create an ObjectID
      return schedule
        .findOne({ user: new ObjectID(user) })
        .finally(() => client.close());
    });

  // Create one empty schedule    
  mu.schedules.create = name =>
  mu.connect().then(client => {
    console.log("MongoUtils:Entró al create vacío de MongoUtils, con el usuario ", name);
    const schedulesCol = client.db(dbName).collection(colName);
    const emptySchedule = {"Mo":[],"Tu":[],"We":[],"Th":[],"Fr":[],"Sa":[],"Su":[] };
    return schedulesCol 
      .insertOne( { user:name, schedule:emptySchedule } )
      .finally(() => client.close());
  });

  // Create one empty schedule    
  mu.schedules.addBusyHour = body =>
  mu.connect().then(client => {
    console.log("MongoUtils: Entró al addBusyHour, con el BODY ", body);
    const schedulesCol = client.db(dbName).collection(colName);
    schedulesCol.find(); //PENDIENTE
    const startArray = body.start.split(":");
    const startNumber = parseInt(startArray[0])-4+(parseInt(startArray[1])/30);
    const endArray = body.end.split(":");
    const endNumber = parseInt(endArray[0])-4+(parseInt(endArray[1])/30);
    const emptySchedule = {"Mon":[],"Tue":[],"Wed":[],"Thu":[],"Fri":[],"Sat":[],"Sun":[] };
    return schedulesCol 
      .insertOne( { user:body, schedule:emptySchedule } )
      .finally(() => client.close());
  });


  mu.schedules.insert = grade =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);

      return gradesCol.insertOne(grade).finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
