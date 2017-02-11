var express = require('express');
var engine = require("ejs-locals");
var mongoose = require('mongoose');
var mongodbUri = require('mongodb-uri');
//
var app = express();
app.engine("ejs", engine);
//
app.use("/", function (req, res, next) {
    console.log("Request URL : " + req.url);
    next();
});
//
app.use("/content", express.static(__dirname + "/assets"));
//
var routes = require("./config/routes");
app.use(routes);
//
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
