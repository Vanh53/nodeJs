# Express advanced: architecture, security và upload

## Tổ chức folder đề xuất

```text
src/
  app.ts
  server.ts
  modules/
    users/
      users.router.ts
      users.service.ts
      users.repository.ts
      users.dto.ts
  middlewares/
  errors/
  config/
```

Express không ép kiến trúc, nhưng project thật vẫn cần module boundary rõ.

## Auth middleware

Auth trong Express thường là middleware:

```ts
app.get('/users', requireAuth, handler);
```

Middleware xác thực token, sau đó gắn `req.user`.

## File upload

`multer` xử lý `multipart/form-data`.

Checklist:

- giới hạn size
- kiểm tra mimetype
- kiểm tra extension nếu cần
- đổi filename
- không lưu trực tiếp theo filename user gửi
- scan virus nếu hệ thống nhạy cảm
- upload cloud storage trong production

## Security middleware

Nên xem xét:

- `helmet`
- CORS config rõ origin
- rate limit
- body limit
- request timeout
- input validation
- output escaping nếu render HTML

## Không để business logic trong route

Route chỉ nên:

1. Lấy input.
2. Validate.
3. Gọi service.
4. Chuyển kết quả thành HTTP response.

Business rule nằm trong service/domain layer.

## Ví dụ chạy

```powershell
npm run express:advanced:once
```
