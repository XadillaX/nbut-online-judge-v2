/**
 * Created by XadillaX on 13-12-17.
 */
var config = require("../config/config");
var util = require("util");

/**
 * Deepin clone an object
 * @param obj
 * @returns {*}
 */
exports.cloneObject = function(obj) {
    if(typeof obj === "object") {
        if(util.isArray(obj)) {
            var newArr = [];
            for(var i = 0; i < obj.length; i++) newArr.push(obj[i]);
            return newArr;
        } else {
            var newObj = {};
            for(var key in obj) {
                newObj[key] = this.cloneObject(obj[key]);
            }
            return newObj;
        }
    } else {
        return obj;
    }
};

/**
 * Get the default render data
 * @returns {*}
 */
exports.defaultRenderData = function() {
    var obj = this.cloneObject(config.defaultRenderData);
    obj.startTimestamp = Date.now();

    return obj;
}
