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
   * 計測時間を取得する (ms)
   * @type {number}
   */
  get time() {
    let elapsed = this.elapsedMs;
    if (this.isMeasuring) {
      elapsed = Date.now() - this.startMs + this.elapsedMs;
    }
    return elapsed;
  }
  
  /**
   * 00:00:00形式で計測時間を取得する
   * @type {string}
   */
  get formattedTime() {
    let elapsed = this.time;
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

module.exports = {
  /**
   * 状態: ストップウォッチモード
   * @constant
   */
  MODE_STOPWATCH: "stopwatch",
  /**
   * 状態: 時計モード
   * @constant
   */
  MODE_CLOCK: "clock"
};
},{}],3:[function(require,module,exports){
"use strict";
//const $ = require("jquery");
const Timer = require("./Timer");
const App = require("./constants");

$(function () {
  let timer = new Timer();
  let t;

  // nav
  $("a.nav-item").on("click", (e) => {
    const $item = $(e.target);

    // acriveの切り替え
    if ($item.parent().hasClass("active")) {
      return;
    }
    $("ul.nav>li").removeClass("active");
    $item.parent().addClass("active");

    // アプリモード変更
    switch ($item.data("appMode")) {
      case App.MODE_STOPWATCH:
        console.log("stopwatch");
        switchStopWatch();
        break;
      case App.MODE_CLOCK:
        console.log("clock");
        switchClock();
        break;
      default:
    }
  });

  // --- モード切り替え ---
  /**
   * ストップウォッチモードに切り替え
   */
  function switchStopWatch() {
    // ボタン類を表示
    $(".controller").show();

    // 動いてるintervalを停止
    clearInterval(t);

    // タイマーの時間を表示
    $("#time").text(timer.formattedTime);

    if (timer.IsMeasuring) {
      // 再開
      $("#time").removeClass("stoped").addClass("measuring");
      t = setInterval(() => {
        $("#time").text(timer.formattedTime);
      }, 256);
    }
  }

  /**
   * 時計モードに切り替え
   */
  function switchClock() {
    // ボタン類を非表示
    $(".controller").hide();

    // 動いてるintervalを停止
    clearInterval(t);

    // 現在時刻を表示
    $("#time").removeClass("measuring").addClass("stoped").text(now());
    // 定期更新
    t = setInterval(() => {
      $("#time").text(now());
    }, 256);
  }

  // --- Clock ---
  /**
   * 現在時刻を返す
   * @returns {string} HH:mm:ss
   */
  function now() {
    const d = new Date();
    return `${leftPadZero(d.getHours())}:${leftPadZero(d.getMinutes())}:${leftPadZero(d.getSeconds())}`;
  }

  function leftPadZero(val) {
    return ("00" + val).slice(-2);
  }

  // --- StopWatch ---
  // start
  $("button#start").on("click", () => {
    if (timer.IsMeasuring) {
      return;
    }
    timer.start();
    $(this).addClass("active");
    $("#time").removeClass("stoped").addClass("measuring");
    t = setInterval(() => {
      $("#time").text(timer.formattedTime);
    }, 256);
  });

  // stop
  $("button#stop").on("click", () => {
    if (!timer.IsMeasuring) {
      return;
    }
    timer.stop();
    $("#time").addClass("stoped").removeClass("measuring");
    clearInterval(t);
    $("#time").text(timer.formattedTime);
    $("button#start").removeClass("active");
  });

  // clear
  $("button#clear").on("click", () => {
    if (timer.IsMeasuring) {
      timer.stop();
      $("#time").addClass("stoped").removeClass("measuring");
      clearInterval(t);
      $("button#start").removeClass("active");
    }
    timer.clear();
    $("#time").text(timer.formattedTime);
  });
});
},{"./Timer":1,"./constants":2}]},{},[3]);
