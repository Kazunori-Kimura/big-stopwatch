"use strict";
const $ = require("jquery");
const Timer = require("./Timer");

$(function(){
  let timer = new Timer();
  let t;
  
  // start
  $("button#start").on("click", () => {
    if (timer.IsMeasuring) {
      return;
    }
    timer.start();
    $(this).addClass("active");
    t = setInterval(() => {
      $("#time").text(timer.time);
    }, 256);
  });
  
  // stop
  $("button#stop").on("click", () => {
    if (!timer.IsMeasuring) {
      return;
    }
    timer.stop();
    clearInterval(t);
    $("#time").text(timer.time);
    $("button#start").removeClass("active");
  });
  
  // clear
  $("button#clear").on("click", () => {
    if (timer.IsMeasuring) {
      timer.stop();
      clearInterval(t);
      $("button#start").removeClass("active");
    }
    timer.clear();
    $("#time").text(timer.time);
  });
});