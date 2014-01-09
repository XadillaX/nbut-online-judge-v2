/**
 * Created by XadillaX on 13-12-21.
 */
var mysql = require("mysql");
var config = require("../../config/config");
var pool = mysql.createPool({
    host        : config.mysql.host,
    user        : config.mysql.user,
    password    : config.mysql.password,
    database    : config.mysql.database
});

function BaseModel() {
    this.config = config;
    this.pool = pool;
}

module.exports = BaseModel;
