# Async programming

## Callback

Callback là nền tảng cũ của async JavaScript:

```js
fs.readFile('file.txt', (error, data) => {});
```

Nhược điểm:

- nested callback khó đọc
- error handling phân tán
- khó compose nhiều tác vụ

## Promise

Promise có ba trạng thái:

- pending
- fulfilled
- rejected

Promise giúp compose bằng `.then`, `.catch`, `Promise.all`, `Promise.allSettled`.

## Async/await

`async/await` là cú pháp trên Promise, giúp code async giống code tuần tự:

```js
try {
  const user = await usersService.findOne(id);
} catch (error) {
  logger.error(error);
}
```

`await` không block toàn bộ process. Nó chỉ tạm dừng function async hiện tại và trả quyền cho event loop.

## Promise concurrency

Chạy tuần tự:

```js
const a = await loadA();
const b = await loadB();
```

Chạy song song:

```js
const [a, b] = await Promise.all([loadA(), loadB()]);
```

Chỉ dùng `Promise.all` khi các tác vụ độc lập nhau.

## Error handling async

Trong Express, lỗi async cần `next(error)` hoặc wrapper. Trong Nest, exception được framework bắt nếu throw trong controller/provider async.

Không bỏ quên Promise:

```js
doWork(); // nếu reject mà không await/catch, dễ thành unhandled rejection
```

## Ví dụ chạy

```powershell
npm run js:async
```
