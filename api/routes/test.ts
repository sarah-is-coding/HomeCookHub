var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/:myNum(\\d+)", function(req, res, next){
    let retString = "Your number is " + String(req.params["myNum"])
    res.send(retString)
});

module.exports = router;