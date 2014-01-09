/**
 * Created by XadillaX on 13-12-21.
 */
var util = require("util");
var BaseModel = require("./base/baseModel");

/**
 * Problem model
 * @constructor
 */
function ProblemModel() {
    BaseModel.call(this);
}

util.inherits(ProblemModel, BaseModel);

module.exports = ProblemModel;
