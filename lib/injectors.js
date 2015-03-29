/**
 * Created by XadillaX on 2015/3/29.
 */
var config = require("../config");

var resp = require("express/lib/response");
var _render = resp.render;
resp.render = function(view, options, fn) {
    options = options || {};

    var renderData = config.renderData;
    for(var key in renderData) {
        if(undefined === options[key]) {
            options[key] = renderData[key];
        }
    }

    _render.bind(this)(view, options, fn);
};
