/**
 * Created by XadillaX on 14-1-9.
 */
var md5 = require("MD5");

var ctrlerDict = {};
var modelDict = {};

/**
 * 获取gravatar地址
 * @param email
 * @param size
 * @returns {string}
 */
exports.gravatar = function(email, size) {
    if(!size) size = 64;
    var url = "http://1.gravatar.com/avatar/" + md5(email) + "?d=monsterid&size=" + parseInt(size);

    return url;
};

/**
 * get model.
 * @param name
 * @returns {*}
 */
exports.model = function(name) {
    if(modelDict[name]) {
        return new modelDict[name]();
    }

    var file = "../model/" + name + "Model";
    var model = null;
    try {
        model = require(file);
    } catch(e) {
        model = null;
    }

    if(model) modelDict[name] = model;

    return new model();
};

/**
 * get controller
 * @param name
 * @returns {*}
 */
exports.controller = function(name) {
    if(ctrlerDict[name]) {
        return ctrlerDict[name];
    }

    var file = "../controller/" + name;
    var ctrler = null;
    try {
        ctrler = require(file);
    } catch(e) {
        ctrler = null;
    }

    if(ctrler) ctrlerDict[name] = ctrler;

    return ctrler;
};
