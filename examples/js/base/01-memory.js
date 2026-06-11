"use strict";

console.log("=== Primitive values are copied by value ===");
let firstScore = 10;
let secondScore = firstScore;
secondScore = 99;
console.log({ firstScore, secondScore });

console.log("\n=== Objects are copied by reference ===");
const userA = {
  id: 1,
  profile: {
    email: "lan@example.com",
    roles: ["reader"],
  },
};
const userB = userA;
userB.profile.roles.push("admin");
console.log("userA changed because userA and userB point to the same heap object:");
console.log(userA);

console.log("\n=== Shallow copy only copies the first level ===");
const shallowCopy = { ...userA };
shallowCopy.profile.email = "changed@example.com";
console.log("Nested profile is still shared:", userA.profile.email);

console.log("\n=== Deep copy separates nested references ===");
const deepCopy = structuredClone(userA);
deepCopy.profile.roles.push("auditor");
console.log("original roles:", userA.profile.roles);
console.log("deep copy roles:", deepCopy.profile.roles);
