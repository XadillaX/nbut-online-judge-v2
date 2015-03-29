/**
 * Created by XadillaX on 2015/3/30.
 */
define("/js/signin.js", function(require, exports, module) {
    var $ = require("jquery");
    var usernames = {};

    function changeAvatar(url) {
        var img = new Image();
        img.onload = function() {
            img.onload = null;
            $("#avatar-loading").css("display", "none");
            $("#avatar").attr("src", url);
        };
        img.src = url;
    }

    // avatar
    $("#username").blur(function() {
        if($("#username").val().trim() === "") {
            return changeAvatar("/images/default-avatar.gif");
        }

        $("#avatar-loading").css("display", "inline-block");

        var username = encodeURIComponent($("#username").val());
        if(!usernames[username]) {
            $.get("/secure/gravatar/" + username + "/64", function(e) {
                usernames[username] = e;
                changeAvatar(usernames[username]);
            });
        } else {
            changeAvatar(usernames[username]);
        }
    });
});
