const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    user = "vaca",//process.env.USER,
  password = "vaca123";//process.env.PASSWORD;
  (dbName = "smartSchedule"), (colName = "schedules");

  mu.connect = () => {
    const client = new MongoClient(
      `mongodb+srv://${user}:${password}@cluster0-3lhwp.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true
      }
    );
    return client.connect();
  };

  // All of processes related to schedules
  mu.schedules = {};
  mu.auth = {};

  // Create one user
  mu.auth.create = body =>
    mu.connect().then(client => {
      // console.log("MongoUtils:Entró al create vacío de MongoUtils, con el usuario ", name);
      const userCol = client.db(dbName).collection("auth");
      return userCol
        .insertOne({ user: body.name, password: body.password })
        .finally(() => client.close());
    });

  // Find items in schedules collection
  mu.schedules.find = query =>
    mu.connect().then(client => {
      console.log("MONGOUTILS. Entró al schedules.find");
      const schedulesCol = client.db(dbName).collection(colName);
      return schedulesCol
        .find(query)
        .sort({ day: 1 })
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
      console.log(
        "MongoUtils:Entró al create vacío de MongoUtils, con el usuario ",
        name
      );
      const schedulesCol = client.db(dbName).collection(colName);
      return schedulesCol
        .insertMany( [ { user: name, day:"Mon", schedule: [] },
        { user: name, day:"Tue", schedule: [] },
        { user: name, day:"Wed", schedule: [] },
        { user: name, day:"Thu", schedule: [] },
        { user: name, day:"Fri", schedule: [] },
        { user: name, day:"Sat", schedule: [] },
        { user: name, day:"Sun", schedule: [] } ] )
        .finally(() => client.close());
    });

  // Add one (or many) busy hours
  mu.schedules.addBusyHour = body =>
    mu.connect().then(client => {
      console.log("MongoUtils: Entró a addBusyHour con el body ", body);
      const schedulesCol = client.db(dbName).collection(colName);
      const usuario = schedulesCol.find({ user: body.user, day: body.day });
      //console.log( "Se trajo de MongoDB el registro: ", usuario );
      const startArray = body.start.split(":");
      const startNumber =
        parseInt(startArray[0]) - 5 + parseInt(startArray[1]) / 30;
      const endArray = body.end.split(":");
      const endNumber = parseInt(endArray[0]) - 5 + parseInt(endArray[1]) / 30;
      console.log(
        "Va a meter busyHours desde ",
        startNumber,
        " hasta ",
        endNumber
      );

      const arreglo = [];
      for (let i = startNumber; i <= endNumber; i++) {
        arreglo.push(i);
      }

      return schedulesCol
        .updateOne(
          { user: body.user, day: body.day },
          {
            $push: {
              schedule: { $each: arreglo }
            }
          }
        )
        .finally(() => client.close());
    });

    // Add one (or many) busy hours
  mu.schedules.removeBusyHour = body =>
    mu.connect().then(client => {
      console.log("MongoUtils: Entró a removeBusyHour con el body ", body);
      const schedulesCol = client.db(dbName).collection(colName);
      const usuario = schedulesCol.find({ user: body.user, day: body.day });
      const startArray = body.start.split(":");
      const number =
        parseInt(startArray[0]) - 5 + parseInt(startArray[1]) / 30;
      
      console.log(
        "Va a remover de busyHours de ", body.user, body.day, " el número ",
        number
      );

      return schedulesCol
        .updateOne(
          { user: body.user, day: body.day },
          {
            $pull: {
              schedule: { $in: [ number ] }
            }
          }
        )
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
