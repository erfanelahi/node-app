var router = require("express").Router();

router.get("/", function (request, response) {
    response.render("index.ejs", { message: "Hello World." });
});

module.exports = router;