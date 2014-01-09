/**
 * Created by XadillaX on 13-12-17.
 */
var config = require("../config/config");
var util = require("util");
var common = require("./common");

/**
 * Initializing the router.
 * @param app
 * @param callback
 */
exports.initializeRouter = function(app, callback) {
    var walk = require("walk");
    var walker = walk.walk(__dirname + "/routers/");

    config.logger.info("Initializing the router...");
    walker.on("file", function(root, fileStats, next) {
        var router = require("./routers/" + fileStats.name);
        var postRouter = router.post;
        var getRouter = router.get;

        // proceed the post router
        for(var key in postRouter) {
            config.logger.trace("Adding `" + key + "` to the post router...");
            if(typeof(postRouter[key]) === "function") {
                app.post(key, postRouter[key]);
            } else if(util.isArray(postRouter[key])) {
                for(var i = 0; i < postRouter[key].length; i++) {
                    app.post(key, postRouter[key][i]);
                }
            }
            config.logger.trace("Added.");
        }

        // proceed the get router
        for(var key in getRouter) {
            config.logger.trace("Adding `" + key + "` to the get router...");

            // common get.
            for(var i = 0; i < common.commonGet.length; i++) {
                app.get(key, common.commonGet[i]);
            }

            if(typeof(getRouter[key]) === "function") {
                app.get(key, getRouter[key]);
            } else if(util.isArray(getRouter[key])) {
                for(var i = 0; i < getRouter[key].length; i++) {
                    app.get(key, getRouter[key][i]);
                }
            }
            config.logger.trace("Added.");
        }

        next();
    });

    walker.on("end", function() {
        config.logger.info("Initialized.");
        callback();
    });
};
