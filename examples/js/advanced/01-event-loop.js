"use strict";

console.log("1. sync start");

setTimeout(() => {
  console.log("5. macrotask: setTimeout");
}, 0);

setImmediate(() => {
  console.log("6. check phase: setImmediate");
});

Promise.resolve().then(() => {
  console.log("4. microtask: Promise.then");
});

process.nextTick(() => {
  console.log("3. nextTick queue has priority in Node");
});

console.log("2. sync end");
