/**
 * Created by XadillaX on 2015/3/29.
 */
var log4js = require("log4js");
log4js.configure({
    appenders: [
        { type: "console" }
    ],
    replaceConsole: true
});
log4js.loadAppender("console");
