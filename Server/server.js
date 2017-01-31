var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodbUri = require('mongodb-uri');
var app = express();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var port = process.env.PORT || 3000;
app.use("/", function (req, res, next) {
    console.log("Request URL : " + req.url);
    next();
});
app.use("/content", express.static(__dirname + "/assets"));
app.get("/", function (request, response) {
    var html = fs.readFileSync(`${__dirname}/index.html`, "utf8");
    response.send(html);
});
var Schema = mongoose.Schema;
var signUp_login_Schema = new Schema({
    userName: String,
    password: String
});
var SignUp = mongoose.model("SignUp", signUp_login_Schema);
app.post("/signup", urlencodedParser, function (request, response) {
    var mongooseConnectString = mongodbUri.formatMongoose('mongodb://erfanelahi:aaa111@ds157258.mlab.com:57258/mydb');
    mongoose.connect(mongooseConnectString);
    var conn = mongoose.connection;
    conn.on('error', function (err) {
        console.error('Connection error.');
        conn.close();
        response.send(`<p style="color:red;">${err}</p><br/><a href="/">Go to Home</a>`);
    });
    conn.once('open', function () {
        console.log('Connection Successful.');
        var newSignUp = SignUp({
            userName: request.body.userName,
            password: request.body.password
        });
        newSignUp.save(function (err) {
            conn.close();
            if (err) {
                console.error('Insert Failed.');
                response.send(`<p style="color:red;">${err}</p><br/><a href="/">Go to Home</a>`);
            } else {
                console.log("New user successfully created.");
                response.send("<p style='color:green;'>New user successfully created.</p><br/><a href='/'>Go to Home</a>");
            }
        });
    });
});
var Login = mongoose.model("Login", signUp_login_Schema);
app.post("/login", urlencodedParser, function (request, response) {
    var mongooseConnectString = mongodbUri.formatMongoose('mongodb://erfanelahi:aaa111@ds157258.mlab.com:57258/mydb');
    mongoose.connect(mongooseConnectString);
    var conn = mongoose.connection;
    conn.on('error', function (err) {
        console.error('Connection error.');
        conn.close();
        response.send(`<p style="color:red;">${err}</p><br/><a href="/">Go to Home</a>`);
    });
    conn.once('open', function () {
        console.log('Connection Successful.');
        var newLogin = Login({
            userName: request.body.userName,
            password: request.body.password
        });
        newLogin.save(function (err) {
            conn.close();
            if (err) {
                console.error('Insert Failed.');
                response.send(`<p style="color:red;">${err}</p><br/><a href="/">Go to Home</a>`);
            } else {
                console.log("Successfully Saved.");
                response.send("<p style='color:green;'>Successfully Saved.</p><br/><a href='/'>Go to Home</a>");
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
