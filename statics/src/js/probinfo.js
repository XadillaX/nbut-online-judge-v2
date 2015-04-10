define("/js/probinfo.js", function(require, exports, module) {
    var $ = require("jquery");

    $("h3 a").click(function() {
        var y = $(this).offset().top;
        window.scrollTo(0, y - 60);
    });
});
