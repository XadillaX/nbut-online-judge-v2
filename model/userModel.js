/**
 * Created by XadillaX on 14-1-9.
 */
var util = require("util");
var BaseModel = require("./base/baseModel");
var async = require("async");
var md5 = require("MD5");

function UserModel() {
    BaseModel.call(this);
}

util.inherits(UserModel, BaseModel);

/**
 * 获取用户题目数信息
 * @param username
 * @param callback
 */
UserModel.prototype.getProblemCount = function(username, callback) {
    var self = this;
    var sql = "SELECT submitnum, solvednum FROM `oj_user` WHERE username = ?";
    var condition = [ username ];

    async.waterfall([
        function(callback) {
            self.pool.getConnection(function(err, conn) {
                callback(err, conn);
            });
        },

        function(conn, callback) {
            conn.query(sql, condition, function(err, result) {
                if(err) {
                    callback(err);
                } else if(result.length === 0) {
                    callback(new Error("不存在该用户。"));
                } else {
                    callback(null, result);
                }

                conn.release();
            });
        }
    ], function(err, result) {
        if(err) {
            return callback(err);
        }

        callback(null, result[0]["submitnum"], result[0]["solvednum"]);
    });
};

/**
 * 检测登录
 * @param username
 * @param password
 * @param callback
 */
UserModel.prototype.verifyLogin = function(username, password, callback) {
    var self = this;
    var sql = "";
    var condition = [ username, md5(password) ];

    /**
     * 判断是否是邮箱
     */
    if(username.indexOf("@") !== -1) {
        sql = "SELECT userid, username, password, roleid, nickname, regtime, solved, submit, school, email, motto, language," +
            "submitlist, solvedlist, submitnum, solvednum, avatarbar " +
            "FROM `oj_user` WHERE email = ? AND password = ?";
    } else {
        sql = "SELECT userid, username, password, roleid, nickname, regtime, solved, submit, school, email, motto, language," +
            "submitlist, solvedlist, submitnum, solvednum, avatarbar " +
            "FROM `oj_user` WHERE username = ? AND password = ?";
    }

    async.waterfall([
        function(callback) {
            self.pool.getConnection(function(err, conn) {
                callback(err, conn);
            });
        },
        function(conn, callback) {
            conn.query(sql, condition, function(err, result) {
                if(err) {
                    callback(err);
                } else if(result.length === 0) {
                    callback(new Error("用户名或者密码错误。"));
                } else {
                    callback(null, result[0]);
                }

                conn.release();
            });
        }
    ], function(err, result) {
        callback(err, result);
    });
};

/**
 * 获取用户头像
 * @param username
 * @param size
 * @param callback
 */
UserModel.prototype.getGravatar = function(username, size, callback) {
    var self = this;
    async.waterfall([
        /**
         * get connection
         * @param callback
         */
        function(callback) {
            self.pool.getConnection(function(err, conn) {
                callback(err, conn);
            });
        },

        /**
         * get sql string
         * @param conn
         * @param callback
         */
        function(conn, callback) {
            var sql = "SELECT email FROM `oj_user` WHERE username = " + conn.escape(username);
            conn.query(sql, function(err, result) {
                if(err) {
                    callback(err);
                } else if(result.length === 0) {
                    callback(new Error("不存在的用户。"));
                } else {
                    callback(err, result[0].email);
                }
                conn.release();
            });
        },

        function(email, callback) {
            email = md5(email);

            var url = "http://1.gravatar.com/avatar/" + email + "?d=monsterid&size=" + parseInt(size);
            callback(null, url);
        }
    ], function(err, result) {
        callback(err, result);
    });
};

module.exports = UserModel;
