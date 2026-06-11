# Express production readiness

## Config

Không đọc `process.env` rải rác trong code. Tạo module config:

```ts
export const config = {
  port: Number(process.env.PORT ?? 3000),
  jwtSecret: requireEnv('JWT_SECRET'),
};
```

Validate env khi app start để fail sớm.

## Logging

Production log nên là structured JSON:

```json
{"level":"info","requestId":"...","method":"GET","path":"/users"}
```

Log cần có request id để trace một request qua nhiều service.

## Graceful shutdown

Khi nhận `SIGTERM`:

1. Ngừng nhận request mới.
2. Chờ request đang chạy xong.
3. Đóng DB connection.
4. Exit.

## Testing

Các lớp test:

- unit test service
- integration test route
- e2e test API

Không test mọi implementation detail của middleware, nhưng phải test behavior quan trọng: validation, auth, error format.

## Deployment

Express app nên chạy sau reverse proxy hoặc platform có TLS, logging và restart policy.

Checklist:

- `NODE_ENV=production`
- env secret qua secret manager
- health endpoint
- metrics
- process manager/container restart
- CI chạy typecheck/test
