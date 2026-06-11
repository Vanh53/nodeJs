"use strict";

function demonstrateVarHoisting() {
  console.log("var before declaration:", legacyName);
  var legacyName = "hoisted as undefined";
  console.log("var after assignment:", legacyName);
}

function demonstrateLetTdz() {
  try {
    console.log(blockName);
  } catch (error) {
    console.log("let/const before declaration throws:", error.message);
  }

  let blockName = "created after the temporal dead zone";
  console.log(blockName);
}

const primitiveSamples = {
  string: "NestJS",
  number: 42,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  symbol: Symbol("id"),
  bigint: 9007199254740993n,
};

demonstrateVarHoisting();
demonstrateLetTdz();

console.log("\n=== typeof quirks ===");
for (const [name, value] of Object.entries(primitiveSamples)) {
  console.log(name, "=>", typeof value);
}

console.log("typeof null is a historical bug:", typeof null);
console.log("Array.isArray([]) gives the correct array check:", Array.isArray([]));
