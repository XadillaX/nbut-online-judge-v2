/**
 * Created by XadillaX on 2015/3/29.
 */
var resp = require("express/lib/response");
var _render = resp.render;

/**
 * send an error json
 * @param msg
 * @returns {*}
 */
resp.error = function(msg) {
    return this.send({ status: 0, msg: msg });
};

/**
 * is user logged in
 * @returns {Boolean}
 */
resp.isLoggedIn = function() {
    return this.renderData && this.renderData.loggedIn;
};

/**
 * hack for `resp.render
 * @param view
 * @param [options]
 * @param [fn]
 */
resp.render = function(view, options, fn) {
    options = options || {};

    var renderData = this.renderData;
    for(var key in renderData) {
        if(undefined === options[key]) {
            options[key] = renderData[key];
        }
    }

    _render.bind(this)(view, options, fn);
};
