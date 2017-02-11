var router = require("express").Router();
var fs = require("fs");

router.get("/", function (request, response) {
    var html = fs.readFileSync(`${__dirname}/index.html`, "utf8");
    response.send(html);
});

module.exports = router;