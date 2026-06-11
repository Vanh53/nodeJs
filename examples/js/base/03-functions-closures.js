"use strict";

function declaration(a, b) {
  return a + b;
}

const expression = function (a, b) {
  return a * b;
};

const arrow = (a, b) => a - b;

function createCounter(start = 0) {
  let value = start;

  return {
    increment() {
      value += 1;
      return value;
    },
    get current() {
      return value;
    },
  };
}

const counter = createCounter(10);

console.log("declaration:", declaration(2, 3));
console.log("expression:", expression(2, 3));
console.log("arrow:", arrow(8, 3));
console.log("closure keeps private state:", counter.increment(), counter.increment());
console.log("current value through getter:", counter.current);

const service = {
  name: "UsersService",
  classicMethod() {
    return this.name;
  },
  arrowMethod: () => this?.name,
};

console.log("classic method this:", service.classicMethod());
console.log("arrow method does not bind object this:", service.arrowMethod());
