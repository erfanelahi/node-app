var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodbUri = require('mongodb-uri');
var engine = require("ejs-locals");
var app = express();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var port = process.env.PORT || 3000;

app.engine("ejs", engine);

app.use("/", function (req, res, next) {
    console.log("Request URL : " + req.url);
    next();
});

app.use("/content", express.static(__dirname + "/assets"));

var routes = require("./config/routes");
app.use(routes);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
