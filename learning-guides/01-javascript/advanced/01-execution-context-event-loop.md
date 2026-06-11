# Execution context và event loop

## Execution context

Mỗi lần JavaScript chạy một function, runtime tạo execution context gồm:

- biến cục bộ
- parameter
- `this`
- scope chain
- nơi trả kết quả

Các context được đẩy vào call stack theo cơ chế LIFO.

## Call stack

Code đồng bộ chạy tới đâu, stack tăng tới đó. Khi function return, stack pop.

Nếu recursive quá sâu, stack đầy và throw `RangeError: Maximum call stack size exceeded`.

## Event loop trong Node.js

Node không chạy nhiều JavaScript thread cho mỗi request. JavaScript chính vẫn chạy trên một thread, nhưng I/O được offload qua hệ thống/kernel/libuv. Khi I/O xong, callback được đưa vào queue.

Các nhóm cần nhớ:

- synchronous code chạy trước.
- `process.nextTick` có ưu tiên rất cao trong Node.
- microtask như `Promise.then` chạy trước macrotask.
- macrotask gồm timer, I/O callback, check phase.

## Microtask và macrotask

Microtask:

- `Promise.then`
- `queueMicrotask`
- async/await continuation

Macrotask:

- `setTimeout`
- `setInterval`
- I/O callback
- `setImmediate`

Nếu tạo microtask vô hạn, event loop có thể bị starvation vì macrotask không có cơ hội chạy.

## Vì sao backend cần hiểu event loop

- Không block thread chính bằng CPU-heavy loop.
- Không dùng sync I/O trong request handler production.
- Biết vì sao `Promise` chạy trước `setTimeout`.
- Biết khi nào cần worker thread hoặc queue.

## Ví dụ chạy

```powershell
npm run js:event-loop
```
