/**
 * Created by XadillaX on 13-12-21.
 */
var async = require("async");
var util = require("util");
var BaseModel = require("./base/baseModel");

/**
 * Contest problem model.
 * @constructor
 */
function ContestProblemModel() {
    BaseModel.call(this);

    this.practicePerPage = 100;
}

util.inherits(ContestProblemModel, BaseModel);

ContestProblemModel.prototype.getProblemInfo = function(index, callback) {
    var self = this;
    var sql = "SELECT * FROM `oj_contestproblem` LEFT JOIN `oj_problem` ON `oj_contestproblem`.`problemid`=`oj_problem`.`problemid` " +
        "WHERE `contestid`=1 AND `index`=?";
    var condition = [ index ];

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
                    callback(new Error("不存在该题目。"));
                } else {
                    callback(null, result[0]);
                }

                conn.release();
            });
        }
    ], function(err, problem) {
        if(err) {
            callback(err);
        } else {
            callback(null, problem);
        }
    });
};

/**
 * Get pracitice page count.
 * @param callback
 */
ContestProblemModel.prototype.getPracticePageCount = function(callback) {
    var self = this;
    var sql = "SELECT count(*) FROM `oj_contestproblem` WHERE `contestid`=1";
    this.pool.getConnection(function(err, conn) {
        if(err) {
            return callback(err);
        }

        conn.query(sql, function(err, total) {
            conn.release();
            if(err) {
                return callback(err);
            }

            total = total[0]["count(*)"];

            var page = parseInt(total / self.practicePerPage);
            if(total % self.practicePerPage) page++;
            if(page === 0) page = 1;

            callback(null, page);
        });
    });
};

/**
 * Get practice list.
 * @param page
 * @param callback
 */
ContestProblemModel.prototype.getPracticeList = function(page, callback) {
    var sql = "SELECT ?? FROM `oj_contestproblem` LEFT JOIN `oj_problem` ON `oj_problem`.`problemid` = `oj_contestproblem`.`problemid`" +
        " WHERE `contestid`=1 ORDER BY `oj_contestproblem`.`index` ASC " +
        "LIMIT " + (parseInt(page - 1) * this.practicePerPage) + ", " + this.practicePerPage + " "
    var fields = [ "index", "title", "submit", "solved" ];

    this.pool.getConnection(function(err, conn) {
        if(err) {
            return callback(err);
        }

        conn.query(sql, [ fields ], function(err, result) {
            conn.release();
            callback(err, result);
        });
    });
}

module.exports = ContestProblemModel;
