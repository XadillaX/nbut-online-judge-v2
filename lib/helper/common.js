/**
 * Created by XadillaX on 2015/4/6.
 */
var _modelCache = {};

/**
 * get model
 * @param name
 * @returns {*}
 */
exports.getModel = function(name) {
    name = name.camelize();

    if(_modelCache[name] !== undefined) {
        return _modelCache[name];
    }

    name = "../../models/" + name + "Model";
    return _modelCache[name] = require(name);
};
