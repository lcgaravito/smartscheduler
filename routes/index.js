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
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00"
    ]
  });
});

// Passport data endpoints
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
  console.log("se creo", req.body);
  bd.auth.create(req.body).then(res.redirect("/"));
});

// Data endpoints

// Get all schedules
router.get("/schedules", function(req, res) {
  
  bd.schedules
    .find({})
    .then(schedules => {
      console.log(schedules);
      res.send(schedules);
    })
});

// Create empty schedule of an especific user
router.post("/schedules/create", (req, res) => {
  console.log("Llegó a create con los parámetros: ", req.body);
  console.log("Se le va a mandar a create el usuario", req.body.user);
  bd.schedules.create(req.body.user).then(res.redirect("/"));
});

// Create empty schedule of an especific user
router.post("/schedules/addBusyHour", (req, res) => {
  console.log(
    "ROUTES/INDEX.JS Llegó a addBusyHour con los parámetros: ",
    req.body
  );
  bd.schedules.addBusyHour(req.body).then(res.redirect("/"));
});

module.exports = router;
