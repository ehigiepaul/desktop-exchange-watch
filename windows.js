// var gui = require("nw.gui");
var path = require("path");
var w = window.screen.width;
var h = window.screen.height;

module.exports.createWindows = (
  uri,
  frame = false,
  width = w,
  hieght = 75,
  positionY = h
) => {
  let win = nw.Window.open(uri, {
    always_on_top: true,
    frame: frame,
    height: hieght,
    width: width,
    show: false,
    // resizable: false,
    y: positionY,
    transparent: true
  });
  return win;
};
