/**
 * Created by XadillaX on 13-12-17.
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

var log4js = require("log4js");
log4js.configure({
    appenders: [
        {
            type: "console"
        },
        {
            type: "file",
            filename: "logs/noj.log",
            maxLogSize: 1024,
            backups: 3,
            category: "V2"
        }
    ],
    replaceConsole: true
});

/**
 * Configuration
 */
module.exports = {
    "server"        : {
        "port"          : 8080,
        "cookieSecret"  : "92D8B2DF87EEB936D721627466695854"
    },

    "mysql"         : {
        "host"          : "localhost",
        "user"          : "root",
        "password"      : "deathmoon",
        "database"      : "onlinejudge"
    },

    "mongodb"       : {
        hostname        : "localhost",
        port            : 27017,
        dbname          : "onlinejudge",

        poolSize: 4
    },

    "environment"   : "DEV",
    "logger"        : log4js.getLogger("V2"),
    "defaultRenderData" : {
        "title"         : "宁波工程学院在线评测幻想乡",
        "nav"           : [ { "name": "Home", "url": "/" } ],
        "pageType"      : "你才type呢~你们全家都type~"
    }
};
