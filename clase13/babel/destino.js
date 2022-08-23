"use strict";

var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
});
