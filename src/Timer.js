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
