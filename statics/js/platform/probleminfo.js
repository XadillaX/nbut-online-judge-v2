/**
 * Created by XadillaX on 14-1-9.
 */
$(function() {
    $("h3 a").click(function() {
        var y = $(this).offset().top;
        window.scrollTo(0, y - 60);
    });
});