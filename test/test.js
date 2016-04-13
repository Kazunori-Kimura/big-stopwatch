"use strict";
const co = require("co");
const Timer = require("../src/Timer.js");

co(function* (){
  const timer = new Timer();
  timer.start();
  yield sleep(5000);
  console.log(timer.time);
  yield sleep(3000);
  console.log(timer.time);
  timer.stop();
  console.log("timer stop.");
  yield sleep(2000);
  console.log("timer restart.");
  timer.start();
  yield sleep(2000);
  console.log(timer.time);
  timer.stop();
  console.log("timer stop.");
  timer.clear();
  console.log("timer clear.");
  console.log(timer.time);
}).catch((err) => {
  console.error(err);
});

/**
 * sleep
 * @param {Number} waitTimeMs - sleep時間 (ミリ秒)
 */
function sleep(waitTimeMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, waitTimeMs);
  });
}

