/**
 * Created by XadillaX on 2015/3/29.
 */
var fs = require("fs");
var path = require("path");

var loadRouters = exports.loadRouters = function(dirname, app) {
    fs.readdirSync(dirname).forEach(function(filename) {
        filename = path.join(dirname, filename);

        if(filename.endsWith(".js")) {
            var relative = path.relative(__dirname, filename);
            if(relative[0] !== ".") {
                relative = "./" + relative;
            }
            relative = relative.substr(0, relative.length - 3);

            var router = require(relative);
            app.use(router.root, router);
        } else {
            var stats = fs.statSync(filename);
            if(stats.isDirectory()) {
                loadRouters(filename, app);
            }
        }
    });
};
