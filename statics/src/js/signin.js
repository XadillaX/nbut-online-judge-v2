/**
 * Created by XadillaX on 2015/3/30.
 */
define("/js/signin.js", function(require, exports, module) {
    var $ = require("jquery");
    var sweetAlert = require("sweetAlert");
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

    function login() {
        var username = $("#username").val().trim();
        var password = $("#password").val();

        if(username.length < 4 || username.length > 16) {
            return sweetAlert({
                title: "登录失败",
                text: "请输入正确的用户名长度",
                type: "error",
                confirmButtonText: "／人◕‿‿◕人＼"
            });
        }

        if(password.length < 5 || password.length > 16) {
            return sweetAlert({
                title: "登录失败",
                text: "请输入正确的密码长度。",
                type: "error",
                confirmButtonText: "／人◕‿‿◕人＼"
            });
        }

        $.post("/secure/signin", {
            username: username,
            password: password
        }, function(res) {
            if(typeof res !== "object") {
                return sweetAlert({
                    title: "登录失败",
                    text: "请求失败。",
                    type: "error",
                    confirmButtonText: "／人◕‿‿◕人＼"
                });
            }

            if(!res.status) {
                return sweetAlert({
                    title: "登录失败",
                    text: res.msg,
                    type: "error",
                    confirmButtonText: "／人◕‿‿◕人＼"
                });
            }

            window.location.href = "/";
        });
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

    $("#go-pikachu").click(login);
    $("#username,#password").keypress(function(e) {
        if(e.keyCode === 10 || e.keyCode === 13) {
            login();
        }
    });
});
