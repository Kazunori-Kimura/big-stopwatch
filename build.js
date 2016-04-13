"use strict";
const co = require("co");
const fs = require("fs-extra-promise");
const path = require("path");
const glob = require("glob-promise");

const honoka_dist = "./bower_components/Honoka/dist";
const honoka_files = [
  "css/bootstrap.min.css",
  "fonts/glyphicons-halflings-regular.eot",
  "fonts/glyphicons-halflings-regular.svg",
  "fonts/glyphicons-halflings-regular.ttf",
  "fonts/glyphicons-halflings-regular.woff",
  "fonts/glyphicons-halflings-regular.woff2",
  "js/bootstrap.min.js"
];
const jquery_dist = "./node_modules/jquery/dist";
const jquery_files = [
  "jquery.min.js",
  "jquery.min.map"
];
const public_lib = "./public/lib";

co(function* () {
  // bower_componentsの必要ファイルのみコピーする
  for (let i=0; i<honoka_files.length; i++) {
    const src = path.resolve(honoka_dist, honoka_files[i]);
    const dist = path.resolve(public_lib, honoka_files[i]);
    yield fs.copyAsync(src, dist);
    console.log(`${honoka_files[i]} copied.`);
  }
  // jqueryをコピーする
  for (let i=0; i<jquery_files.length; i++) {
    const src = path.resolve(jquery_dist, jquery_files[i]);
    const dist = path.resolve(public_lib, "js", jquery_files[i]);
    yield fs.copyAsync(src, dist);
    console.log(`${jquery_files[i]} copied.`);
  }
}).catch((err) => {
  console.error(err);
});
