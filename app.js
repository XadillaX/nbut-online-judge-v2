/**
 * Ningbo University of Technology
 *                      Online Judge System !V2
 */
var express = require('express');
var http = require('http');
var path = require('path');
var config = require("./config/config");
var async = require("async");
var router = require("./router");
var MongoStore = require('connect-mongo')(express);

var app = express();

// Configure the logger level
if(config.environment === "DEV") {
    config.logger.setLevel("TRACE");
} else {
    config.logger.setLevel("DEBUG");
}
if(config.environment === "DEV") {
    app.use(express.errorHandler());
}

app.set("port", config.server.port);
app.set("config", config);
app.set("views", path.join(__dirname, "template"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(config.server.cookieSecret));
app.use(express.session({
    secret: config.server.cookieSecret,
    store: new MongoStore({
        host: config.mongodb.hostname,
        port: config.mongodb.port,
        db  : config.mongodb.dbname
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, "statics")));

async.series({
    "setRouter": function(callback) {
        router.initializeRouter(app, callback);
    },
    "startServer": function(callback) {
        http.createServer(app).listen(app.get("config").server.port, function() {
            console.log("NBUT Online Judge V2 Server started on port " + config.server.port + ".");
            callback();
        });
    }
});
