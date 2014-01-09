/**
 * Created by XadillaX on 14-1-9.
 */
var UglifyJS = require("uglify-js");

/**
 * 合并以及最小化JS文件
 * @param req
 * @param resp
 */
exports.merge = function(req, resp) {
    var files = req.params.files;
    files = files.split("+");

    if(!files[files.length - 1]) {
        files.pop();
    }

    for(var i = 0; i < files.length; i++) {
        var filename = "statics/js/platform/" + files[i];
        if(files[i].indexOf(".js") === -1) {
            filename += ".js";
        }
        files[i] = filename;
    }

    var result = UglifyJS.minify(files);

    resp.set("content-type", "application/javascript");
    resp.send(200, result.code);
};
