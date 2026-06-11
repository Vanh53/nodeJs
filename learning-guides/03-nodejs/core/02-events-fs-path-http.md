# EventEmitter, fs/path và HTTP raw

## EventEmitter

EventEmitter là pattern publish/subscribe trong Node:

```ts
events.on('user.created', listener);
events.emit('user.created', payload);
```

Ứng dụng:

- domain event trong memory
- logging nội bộ
- lifecycle hook
- stream events

Không nên lạm dụng EventEmitter để thay thế flow rõ ràng. Nếu event quan trọng cần bền vững, dùng message queue hoặc database outbox.

## File system

Ưu tiên async API từ `node:fs/promises`:

```ts
import { readFile } from 'node:fs/promises';
```

Tránh sync I/O trong request handler vì nó block event loop.

## Path

Dùng `node:path` thay vì nối string:

```ts
path.join(process.cwd(), 'uploads', filename);
```

Điều này giúp code chạy đúng trên Windows, macOS và Linux.

## HTTP raw

Node có module `node:http` để tạo server không cần framework:

```ts
const server = http.createServer((req, res) => {});
```

Bạn phải tự xử lý:

- method
- path
- header
- parse body
- serialize response
- status code
- error handling

Học HTTP raw giúp hiểu Express/Nest đang làm gì phía dưới.

## Ví dụ chạy

```powershell
npm run node:events
npm run node:fs
npm run node:http:once
```
