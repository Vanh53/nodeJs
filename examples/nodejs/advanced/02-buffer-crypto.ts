import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const text = 'Node.js core';
const buffer = Buffer.from(text, 'utf8');
const hash = createHash('sha256').update(buffer).digest('hex');

const tokenA = randomBytes(16);
const tokenB = Buffer.from(tokenA);
const tokenC = randomBytes(16);

console.log('buffer bytes:', buffer);
console.log('sha256:', hash);
console.log('safe equal A/B:', timingSafeEqual(tokenA, tokenB));
console.log('safe equal A/C:', timingSafeEqual(tokenA, tokenC));
