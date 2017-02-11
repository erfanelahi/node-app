var router = require("express").Router();
var bodyParser = require('body-parser');
//
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//
router.get("/", function (request, response) {
    response.render("index.ejs", { message: "Hello World." });
});
//
module.exports = router;