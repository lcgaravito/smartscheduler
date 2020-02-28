var express = require("express");
var router = express.Router();
const bd = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) 
{
  console.log("asdasd");
  res.render("index", { title: "Express" });
  bd.connect()
    .then(cliente => {
      console.log("cliente: ",cliente);
      
      const a = cliente.bd("smartScheduler");
      a.collection("schedules").insertOne({"name": "Juan Pablo"}).then(result => console.log("listo", result));
    });
    
});

router.get("/login", function(req, res) 
{
  console.log("asdasd");
  res.render("login");  
});

router.post("/login", function(req, res) 
{
  console.log("asdasd");
  res.render("register");  
});



router.get("/register", function(req, res) 
{
  console.log("asdasd");
  res.render("register");  
});

router.post("/register", function(req, res) 
{
  req.body.name
});


module.exports = router;
