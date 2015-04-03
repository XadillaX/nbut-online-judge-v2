require("./lib/toshihiko");
require("./log4js");

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var config = require("./config");
var router = require("./lib/routers");
var middlewares = require("./lib/middlewares");
var Session = require("express-session");
var RiakStore = require("express-riak")(Session);
var app = express();

if(config.dev) {
    app.set("views", path.join(__dirname, "templates/src"));
    app.set("view engine", "jade");
    app.use(favicon(__dirname + "/statics/dev/favicon.ico"));
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "statics/dev")));
} else {
    app.set("views", path.join(__dirname, "templates/build"));
    app.set("view engine", "jade");
    app.use(favicon(__dirname + "/statics/build/favicon.ico"));
    app.use(logger("common"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "statics/build")));
}

app.use(middlewares.renderData);
app.use(Session({
    store: new RiakStore({
        bucket: config.riak.prefix + "sessions",
        connection: {
            nodes: config.riak.nodes
        }
    }),
    secret: config.session.secret,
    name: "nOjSiD",
    resave: false,
    saveUninitialized: true
}));
app.use(middlewares.loginStatus);
require("./lib/injectors");
router.loadRouters(__dirname + "/controllers", app);

// catch 404 and forward to error handler
app.use(function(req, resp, next) {
    var err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

if(config.dev) {
    app.use(function(err, req, resp, _) {
        resp.renderData.nav.push({ name: err.status || 500, url: req.originalUrl });
        resp.status(err.status || 500);
        return resp.render("error", {
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function(err, req, resp, _) {
        resp.renderData.nav.push({ name: err.status || 500, url: req.originalUrl });
        resp.status(err.status || 500);
        return resp.render("error", {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
