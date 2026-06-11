# Cách chạy ví dụ

Tất cả ví dụ nằm trong `examples/` và được khai báo trong `package.json`.

## JavaScript

```powershell
npm run js:memory
npm run js:variables
npm run js:functions
npm run js:data
npm run js:event-loop
npm run js:async
npm run js:oop
npm run js:errors
```

## TypeScript

```powershell
npm run ts:types
npm run ts:contracts
npm run ts:narrowing
npm run ts:generics
npm run ts:utilities
npm run ts:unions
```

## Node.js core

```powershell
npm run node:modules
npm run node:events
npm run node:fs
npm run node:http
npm run node:http:once
npm run node:streams
npm run node:buffer
npm run node:child
```

Các script có hậu tố `:once` sẽ tự mở server, tự gọi request thử, in kết quả rồi tắt server.

## Express

```powershell
npm run express:core
npm run express:core:once
npm run express:advanced
npm run express:advanced:once
```

Port mặc định:

- Express core: `http://localhost:3002`
- Express advanced: `http://localhost:3003`

## NestJS

```powershell
npm run nest:core
npm run nest:core:once
npm run nest:advanced
npm run nest:advanced:once
```

Port mặc định:

- Nest core: `http://localhost:3004`
- Nest advanced: `http://localhost:3005`

## Khi server đang chạy

Ví dụ gọi Express core:

```powershell
curl http://localhost:3002/health
curl http://localhost:3002/users
curl -X POST http://localhost:3002/users -H "Content-Type: application/json" -d "{\"email\":\"lan@example.com\"}"
```

Ví dụ gọi route có token ở Express/Nest advanced:

```powershell
curl http://localhost:3003/users -H "Authorization: Bearer demo-token"
curl http://localhost:3005/users -H "Authorization: Bearer demo-token"
```
