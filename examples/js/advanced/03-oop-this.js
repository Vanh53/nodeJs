"use strict";

class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }
}

class PremiumAccount extends Account {
  constructor(owner, balance, cashbackRate) {
    super(owner, balance);
    this.cashbackRate = cashbackRate;
  }

  purchase(amount) {
    this.balance -= amount;
    this.balance += amount * this.cashbackRate;
    return this.balance;
  }
}

const account = new PremiumAccount("Lan", 1000, 0.02);
const looseDeposit = account.deposit;

console.log("purchase:", account.purchase(100));

try {
  looseDeposit(50);
} catch (error) {
  console.log("lost this context:", error.message);
}

const boundDeposit = account.deposit.bind(account);
console.log("bound method:", boundDeposit(50));
console.log("call with explicit this:", Account.prototype.deposit.call(account, 25));
