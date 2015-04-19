/**
 * XadillaX created at 2015-04-19 15:50:08
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
define("/js/feedcode.js", function(require, exports, module) {

var $ = require("jquery");
//////////////////////////////////////////////////////////////

// set index input into `readonly`
// if ness..(forgot how to spell it!)..ry
if(index !== "") {
    $("#index").attr("readonly", "true");
}

// create the editor
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/" + defaultMode,
    matchBrackets: true,
    indentUnit: defaultIndent,
    autofocus: true,
    foldGutter: true,
    gutters: [ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ],
    extraKeys: {
        "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }
    },
    theme: "solarized dark"
});

//////////////////////////////////////////////////////////////

});

