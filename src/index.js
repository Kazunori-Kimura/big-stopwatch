"use strict";
//const $ = require("jquery");
const Timer = require("./Timer");
const App = require("./constants");

$(function () {
  let timer = new Timer();
  // interval管理
  let t;
  // 制限時間
  let limit = 0;
  
  // 通常時メッセージを表示
  $("#helpBlock").text(App.MSG_DEFAULT);

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

  /**
   * 左0埋め2桁
   * @param {number} val - 0埋めする数値
   * @returns {string}
   */
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
    $("#time").removeClass("stoped").addClass("measuring").removeClass("over");
    t = setInterval(() => {
      $("#time").text(timer.formattedTime);
      
      if (limit <= timer.time) {
        $("#time").addClass("over");
      }
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
      clearInterval(t);
      $("button#start").removeClass("active");
    }
    $("#time").addClass("stoped").removeClass("measuring").removeClass("over");
    timer.clear();
    $("#time").text(timer.formattedTime);
  });
  
  // 時間制限
  $("#limit").on("keyup", (e) => {
    const val = $(e.target).val();
    
    if (isNaN(val)) {
      $("#helpBlock").text(App.MSG_LIMIT_NAN);
      $(e.target).parent().addClass("has-error");
      limit = 0;
      return;
    }
    
    $(e.target).parent().removeClass("has-error");
    $("#helpBlock").text(App.MSG_DEFAULT);
    limit = parseInt(val, 10) * 60 * 1000; // min -> ms
  });
});