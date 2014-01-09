/**
 * Created by XadillaX on 14-1-9.
 */
var usernames = {};

/**
 * 修改头像
 * @param url
 */
function changeAvatar(url) {
    var img = new Image();
    img.onload = function() {
        img.onload = null;
        $("#avatar-loading").css("display", "none");
        $("#avatar").attr("src", url);
    }
    img.src = url;
}

function goPikachu() {
    if($("#go-pikachu").hasClass("disabled")) return;

    $("#go-pikachu").button("loading");

    $.post("/api/secure/signin", {
        username: $("#username").val(),
        password: $("#password").val()
    }, function(e) {
        if(e.status) {
            $("#go-pikachu").button("complete");

            window.location.href = referer;
        } else {
            $("#alert-content").html(e.msg);
            $("#signin-alert").slideDown("normal");

            $("#go-pikachu").button("reset");
        }
    })
}

$(function() {
    /**
     * 头像处理
     */
    $("#username").blur(function() {
        if($("#username").val().trim() === "") {
            changeAvatar("/images/default-avatar.gif");
            return;
        }

        $("#avatar-loading").css("display", "inline-block");

        var username = $("#username").val();
        if(!usernames[username] || usernames[username] === undefined) {
            $.get("/api/user/gravatar/" + username + "/64", function(e) {
                console.log("/api/user/gravatar/" + username + "/64");
                usernames[username] = e;
                changeAvatar(usernames[username]);
            });
        } else {
            changeAvatar(usernames[username]);
        }
    });

    /**
     * 登录
     */
    $("#go-pikachu").click(function() {
        goPikachu();
    });
    $("#username, #password").keydown(function(e) {
        if(e.keyCode === 13) goPikachu();
    });
});