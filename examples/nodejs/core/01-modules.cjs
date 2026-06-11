const path = require("node:path");
const { add, multiply } = require("./lib/math.cjs");

console.log("CommonJS require result:", { sum: add(2, 3), product: multiply(4, 5) });
console.log("__dirname:", __dirname);
console.log("cross-platform path:", path.join(__dirname, "data", "users.json"));
console.log("process pid:", process.pid);
