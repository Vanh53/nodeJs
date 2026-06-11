# Node.js runtime, modules và globals

## Node.js là gì

Node.js là JavaScript runtime cho server-side. Node dùng V8 để chạy JS và libuv để xử lý event loop, I/O, timer, filesystem, network.

## Non-blocking I/O

Node phù hợp I/O-heavy workload vì request không cần giữ thread trong lúc chờ database, file hoặc network.

Nhưng CPU-heavy code vẫn block event loop nếu chạy trên main thread.

## CommonJS

```js
const fs = require('node:fs');
module.exports = { run };
```

CommonJS vẫn phổ biến trong Node ecosystem.

## ES Modules

```js
import fs from 'node:fs';
export function run() {}
```

ESM là chuẩn hiện đại của JavaScript. Trong project thật, nên chọn một module system rõ ràng và cấu hình nhất quán.

## Node globals

- `process`: env, pid, argv, exitCode.
- `Buffer`: làm việc với binary data.
- `__dirname`, `__filename`: có trong CommonJS.
- `globalThis`: global object chuẩn.

## Prefix `node:`

Nên import core module bằng prefix:

```ts
import path from 'node:path';
```

Điều này làm rõ đây là module built-in, không phải package ngoài.

## Ví dụ chạy

```powershell
npm run node:modules
```
