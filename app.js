// var yargs = require("yargs");
// var greet = require("./greet.js");
// // console.log(process.argv);
// // console.log(process.env);
// if (yargs.argv.env === 'prod') {
//     greet.MyPrintResult(greet.Multiply);
// }
// greet.MyPrintResult(function () {
//     return 9.81 / 3.1416;
// });
//****************************************** Events / Emitter 
// var Events = require("events");
// var Emitter = require("./emitter");

// var bombEmitter = new Emitter();
// var gunEmitter = new Emitter();
// bombEmitter.on("fire", function() {
//     console.log("Shuuu...");
// });
// bombEmitter.on("fire", function() {
//     console.log("Boom!!!");
// });
// gunEmitter.on("load", function() {
//     console.log("Tok...Tok...Tok");
// });
// gunEmitter.on("fire", function() {
//     console.log("Tash...Tash...Tash");
// });
// console.log("Get Ready For Bombing: ");
// bombEmitter.emit("fire");
// console.log("Load The Guns: ");
// gunEmitter.emit("load");
// console.log("Shoot Them: ");
// gunEmitter.emit("fire");
// var nodeEvent = new Events();
// nodeEvent.on("greet", function(data) {
//     console.log(`Hello NodeJs!!! -${data}`);
// });
// nodeEvent.emit("greet", "Erfan");
// readFile / readFileSync / createReadStream / createWriteStream / pipe / createGzip
// var util = require("util");
// var fs = require("fs");
// var zlib = require("zlib");
// fs.readFile(`${__dirname}/CustomGreet.txt`, "utf8", function (err, data) {
//     if (err === null) {
//         util.log(util.format("Async Data: %s", data));
//     } else {
//         util.log(util.format("Async Error: %s", err));
//     }
// });
// var myGreetText = fs.readFileSync(`${__dirname}/CustomGreet.txt`, "utf8");
// util.log("Sync Data: " + myGreetText);
// var readable = fs.createReadStream(`${__dirname}/CustomGreet.txt`, {
//     encoding: "utf8",
//     highWaterMark: 5
// });
// var writable = fs.createWriteStream(`${__dirname}/CustomGreetCopy.txt`);
// var compressed = fs.createWriteStream(`${__dirname}/CustomGreetCopy.txt.gz`);
// readable.on("data", function (chunk) {
//     console.log("Length : " + chunk.length);
//     writable.write("\nChunk : " + chunk);
// });
// readable.pipe(writable);
// readable.pipe(zlib.createGzip()).pipe(compressed);
//****************************************** Node Server
// var http = require("http");
// http.createServer(function (request, response) {
//     if (request.url === '/') {
//         response.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         //fs.createReadStream(`${__dirname}/TestHTML.html`).pipe(response);
//         var html = fs.readFileSync(`${__dirname}/TestHTML.html`, "utf8");
//         var message = "Hello World!!!";
//         html = html.replace('{{message}}', message);
//         response.end(html);
//     } else if (request.url === '/api') {
//         response.writeHead(200, {
//             'Content-Type': 'application/json'
//         });
//         var obj = {
//             firsName: 'Erfan',
//             lastName: 'Elahi',
//             address: 'Lake Circus, Kalabagan, Dhaka-1205, Bangladesh.'
//         }
//         response.end(JSON.stringify(obj));
//     } else {
//         response.writeHead(404, {
//             'Content-Type': 'text/html'
//         });
//         response.end("<h1 style='color:red;'>Not Found!!!</h1>");
//     }

// }).listen(1230, '127.0.0.1');
//****************************************** Express Server
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
    var html = fs.readFileSync(`${__dirname}/TestHTML.html`, "utf8");
    var message = "Hello World!!!";
    html = html.replace('{{message}}', message);
    response.send(html);
});
app.get("/person/:id", function (request, response) {
    response.send(`<html><head></head><body><h1>Person : ${request.params.id}</h1></body></html>`);
});
app.get("/person", function (request, response) {
    var obj = {
        firsName: 'Erfan',
        lastName: 'Elahi',
        address: 'Lake Circus, Kalabagan, Dhaka-1205, Bangladesh.'
    }
    response.json(obj);
});
app.post("/person", urlencodedParser, function (request, response) {
    var mongooseConnectString = mongodbUri.formatMongoose('mongodb://erfanelahi:aaa111@ds157258.mlab.com:57258/mydb');
    mongoose.connect(mongooseConnectString);
    var conn = mongoose.connection;
    conn.on('error', function (err) {
        console.error('Connection error.');
        response.send(`<p style="color:red;">${err}</p><br/><a href="/">Go to Home</a>`);
    });
    conn.once('open', function () {
        console.log('Connection Successful.');
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            firstName: String,
            lastName: String
        });
        var User = mongoose.model("User", userSchema);
        var newUser = User({
            firsName: request.body.firstName,
            lastName: request.body.lastName
        });
        newUser.save(function (err) {
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