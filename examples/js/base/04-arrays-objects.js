"use strict";

const users = [
  { id: 1, email: "lan@example.com", age: 24, roles: ["user"] },
  { id: 2, email: "minh@example.com", age: 31, roles: ["user", "admin"] },
  { id: 3, email: "an@example.com", age: 17, roles: ["guest"] },
];

const emails = users.map((user) => user.email);
const adults = users.filter((user) => user.age >= 18);
const userById = users.reduce((map, user) => {
  map[user.id] = user;
  return map;
}, {});
const firstAdmin = users.find((user) => user.roles.includes("admin"));
const allRoles = users.flatMap((user) => user.roles);

const dynamicKey = "lastLoginAt";
const profile = {
  id: 1,
  email: "lan@example.com",
  [dynamicKey]: new Date("2026-06-11T08:00:00Z").toISOString(),
};

const { email, ...publicProfile } = profile;

console.log({ emails, adults, userById, firstAdmin, allRoles });
console.log("public profile without email:", publicProfile);
console.log("entries:", Object.entries(profile));
