# NestJS request lifecycle

Luồng request quan trọng:

```text
Request -> Middleware -> Guard -> Pipe -> Controller -> Service -> Interceptor -> Response
                                      -> Exception Filter nếu có lỗi
```

## Middleware

Middleware chạy trước route handler. Dùng cho:

- logging
- request id
- CORS/header đơn giản
- raw request preprocessing

## Guard

Guard quyết định request có được đi tiếp không.

Ứng dụng:

- JWT auth
- role/permission
- feature flag
- API key

## Pipe

Pipe xử lý argument trước khi vào controller.

Ứng dụng:

- validate DTO
- transform string param thành number
- sanitize input

`ValidationPipe` thường dùng global:

```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```

## Interceptor

Interceptor bọc trước/sau method execution.

Ứng dụng:

- response envelope
- logging duration
- cache
- timeout
- mapping data

## Exception filter

Filter chuẩn hóa error response:

```json
{
  "error": "email must be valid",
  "meta": {
    "path": "/users",
    "timestamp": "..."
  }
}
```

## Custom decorator

Custom decorator giúp controller sạch hơn:

```ts
@CurrentUser() user: User
```

Thay vì đọc `req.user` thủ công ở mọi route.

## Ví dụ chạy

```powershell
npm run nest:advanced:once
```
