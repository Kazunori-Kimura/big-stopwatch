(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Timer
 */
class Timer {
  constructor() {
    this.startMs = 0;
    this.elapsedMs = 0;
    this.isMeasuring = false;
  }
  
  /**
   * 時間の計測を開始する
   */
  start() {
    this.startMs = Date.now();
    this.isMeasuring = true;
  }
  
  /**
   * 時間の計測を停止する
   */
  stop() {
    this.elapsedMs += Date.now() - this.startMs;
    this.isMeasuring = false;
  }
  
  /**
   * 計測時間をクリアする
   */
  clear() {
    this.startMs = 0;
    this.elapsedMs = 0;
    this.isMeasuring = false;
  }
  
  /**
   * 計測時間を取得する
   * @type {string}
   */
  get time() {
    let elapsed = this.elapsedMs;
    if (this.isMeasuring) {
      elapsed = Date.now() - this.startMs + this.elapsedMs;
    }
    const h = String(Math.floor(elapsed / 3600000) + 100).substring(1);
    const m = String(Math.floor((elapsed - h * 3600000)/60000)+ 100).substring(1);
    const s = String(Math.round((elapsed - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
    //const S = ("000" + elapsed).slice(-3);
    return `${h}:${m}:${s}`;
  }
  
  /**
   * 計測中かどうか
   * @type {boolean}
   */
  get IsMeasuring() {
    return this.isMeasuring;
  }
}

module.exports = Timer;

},{}],2:[function(require,module,exports){
"use strict";
//const $ = require("jquery");
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
},{"./Timer":1}]},{},[2]);
