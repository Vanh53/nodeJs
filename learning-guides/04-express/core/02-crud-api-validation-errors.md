# Express CRUD, validation và errors

## CRUD API tối thiểu

Một resource thường có:

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

Ví dụ trong repo hiện có create/list để giữ nhỏ và dễ chạy.

## Validation

Không tin `req.body`. Với TypeScript, `req.body` về bản chất là dữ liệu runtime chưa đáng tin.

Luồng đúng:

1. Nhận `unknown`.
2. Kiểm tra shape.
3. Trả object đã validate.
4. Service chỉ nhận input đã sạch.

## Error middleware

Error middleware có 4 tham số:

```ts
app.use((error, req, res, next) => {});
```

Express nhận diện error middleware bằng số lượng tham số, nên `_next` vẫn cần có.

## Async errors

Express 4 cần wrapper:

```ts
const asyncHandler = (handler) => (req, res, next) => {
  handler(req, res, next).catch(next);
};
```

Nếu không, rejected Promise có thể không đi vào error middleware.

## Response envelope

Nên chuẩn hóa response:

```json
{
  "data": {},
  "meta": {
    "requestId": "..."
  }
}
```

Error cũng nên có format nhất quán.

## Ví dụ chạy

```powershell
npm run express:advanced:once
```
