"use strict";

function legacyCallback(value, callback) {
  setTimeout(() => {
    if (value < 0) {
      callback(new Error("value must be positive"));
      return;
    }

    callback(null, value * 2);
  }, 20);
}

function callbackToPromise(value) {
  return new Promise((resolve, reject) => {
    legacyCallback(value, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

async function main() {
  const one = await callbackToPromise(5);
  const many = await Promise.all([callbackToPromise(1), callbackToPromise(2)]);

  try {
    await callbackToPromise(-1);
  } catch (error) {
    console.log("caught async error:", error.message);
  }

  console.log({ one, many });
}

main().catch((error) => {
  console.error("unexpected failure:", error);
  process.exitCode = 1;
});
