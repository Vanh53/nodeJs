# Express core: routing, middleware và request/response

## Express là gì

Express là framework HTTP mỏng trên Node. Nó không ép kiến trúc module như Nest, nên bạn phải tự tổ chức folder, middleware, validation và error handling.

## App và router

```ts
const app = express();
app.get('/users', handler);
app.post('/users', handler);
```

Trong project lớn, tách router:

```ts
app.use('/users', usersRouter);
```

## Middleware

Middleware có chữ ký:

```ts
function middleware(req, res, next) {}
```

Nó chạy theo thứ tự đăng ký. Middleware có thể:

- đọc request
- gắn dữ liệu vào request
- set response header
- chặn request
- gọi `next()` để đi tiếp

## Body parser

```ts
app.use(express.json());
```

Luôn đặt giới hạn body size trong production:

```ts
app.use(express.json({ limit: '1mb' }));
```

## Response

Luôn trả status code rõ:

```ts
res.status(201).json({ data: user });
```

Không để route vừa `res.json()` vừa tiếp tục chạy logic phía sau. Sau khi gửi response, nên `return`.

## Ví dụ chạy

```powershell
npm run express:core:once
```
