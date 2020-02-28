var express = require("express");
var router = express.Router();
const bd = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  console.log("Llegó hasta aquí.");
  res.render("index", {
    title: "Smart Scheduler",
    hours: [
      "5:00",
      "5:30",
      "6:30",
      "6:00",
      "7:00",
      "7:30",
      "8:30",
      "8:00",
      "9:00",
      "9:30",
      "10:30",
      "10:00",
      "11:00",
      "11:30",
      "12:30",
      "12:00",
      "13:00",
      "13:30",
      "14:30",
      "14:00",
      "15:00",
      "15:30",
      "16:30",
      "16:00",
      "17:00",
      "17:30",
      "18:30",
      "18:00",
      "19:00",
      "19:30",
      "20:30",
      "20:00"
    ]
  });
});

router.get("/testdb", function(req, res) {
  console.log("asdasd");
  res.render("index", { title: "Express" });
  bd.connect().then(cliente => {
    console.log("cliente: ", cliente);

    const a = cliente.bd("smartScheduler");
    a.collection("schedules")
      .insertOne({ name: "Juan Pablo" })
      .then(result => console.log("listo", result));
  });
});

router.get("/login", function(req, res) {
  console.log("asdasd");
  res.render("login");
});

router.post("/login", function(req, res) {
  console.log("asdasd");
  res.render("register");
});

router.get("/register", function(req, res) {
  console.log("asdasd");
  res.render("register");
});

router.post("/register", function(req, res) {
  console.log("asdasd");
  res.render("register");
});

module.exports = router;
