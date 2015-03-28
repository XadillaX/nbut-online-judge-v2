/**
 * Created by XadillaX on 2015/3/29.
 */
var Toshihiko = require("toshihiko").Toshihiko;
var config = require("../config").database;
var memcached = require("../config").memcached;

var toshihiko = global.toshihiko = new Toshihiko(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,

    showSql: true,

    cache: {
        name: "memcached",
        servers: memcached.servers,
        options: memcached.options
    }
});
