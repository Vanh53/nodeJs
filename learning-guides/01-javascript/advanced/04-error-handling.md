# Error handling

## Error cơ bản

```js
throw new Error('Something failed');
```

Luôn throw `Error` hoặc class extends `Error`, không throw string/object tùy ý.

## Custom error

Custom error giúp phân loại lỗi:

```js
class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}
```

## `try/catch/finally`

`try`: vùng có thể lỗi.

`catch`: xử lý lỗi.

`finally`: luôn chạy, phù hợp cleanup resource.

## Async errors

Lỗi trong async function trở thành rejected Promise:

```js
async function run() {
  throw new Error('failed');
}
```

Phải `await` trong `try/catch` hoặc `.catch()`.

## Phân loại lỗi backend

- Validation error: input sai, trả 400.
- Auth error: chưa đăng nhập hoặc token sai, trả 401.
- Authorization error: không đủ quyền, trả 403.
- Not found: tài nguyên không tồn tại, trả 404.
- Conflict: trùng email, version conflict, trả 409.
- Internal error: bug hoặc hạ tầng lỗi, trả 500.

## Ví dụ chạy

```powershell
npm run js:errors
```
