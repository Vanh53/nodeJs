# Lộ trình học chi tiết: JavaScript, TypeScript, Node.js, Express và NestJS

File này là bản lộ trình học tổng hợp cho toàn bộ tài liệu trong thư mục `learning-guides/` và các ví dụ chạy được trong `examples/`.

## 0. Chuẩn bị môi trường

Thời lượng gợi ý: 0.5 ngày.

Đọc:

- `learning-guides/00-setup/01-manual-setup.md`
- `learning-guides/00-setup/02-how-to-run-examples.md`

Làm:

```powershell
npm install
npm run check
npm run examples:quick
```

Kết quả cần đạt:

- Biết cách cài dependencies.
- Biết chạy từng ví dụ JS/TS/Node/Express/Nest.
- Biết script nào dùng để chạy server lâu dài và script nào tự chạy rồi tắt bằng hậu tố `:once`.

## 1. JavaScript nền tảng

Thời lượng gợi ý: 4-6 ngày.

Đọc:

- `learning-guides/01-javascript/base/01-runtime-and-memory.md`
- `learning-guides/01-javascript/base/02-variables-types-operators.md`
- `learning-guides/01-javascript/base/03-functions-scope-closures.md`
- `learning-guides/01-javascript/base/04-arrays-objects.md`

Chạy:

```powershell
npm run js:memory
npm run js:variables
npm run js:functions
npm run js:data
```

Trọng tâm:

- Stack vs heap.
- Primitive vs reference.
- Shallow copy vs deep copy.
- `let`, `const`, temporal dead zone.
- `===`, `??`, `?.`.
- Function declaration, expression, arrow function.
- Scope, closure, `this`.
- `map`, `filter`, `reduce`, `find`, `flatMap`.

Kết quả cần đạt:

- Giải thích được vì sao sửa object qua biến B có thể làm biến A thay đổi.
- Viết được closure giữ private state.
- Biết chọn array method đúng thay vì dùng vòng lặp cho mọi thứ.
- Tránh được các lỗi cơ bản với `var`, loose equality và mất `this`.

## 2. JavaScript nâng cao

Thời lượng gợi ý: 4-6 ngày.

Đọc:

- `learning-guides/01-javascript/advanced/01-execution-context-event-loop.md`
- `learning-guides/01-javascript/advanced/02-async-programming.md`
- `learning-guides/01-javascript/advanced/03-oop-this-prototype.md`
- `learning-guides/01-javascript/advanced/04-error-handling.md`

Chạy:

```powershell
npm run js:event-loop
npm run js:async
npm run js:oop
npm run js:errors
```

Trọng tâm:

- Execution context.
- Call stack.
- Event loop.
- Microtask vs macrotask.
- `process.nextTick`, `Promise`, `setTimeout`, `setImmediate`.
- Callback, Promise, async/await.
- Class, inheritance, prototype.
- Custom error và async error handling.

Kết quả cần đạt:

- Dự đoán được thứ tự log trong ví dụ event loop.
- Biết khi nào dùng `Promise.all`.
- Biết xử lý rejected Promise bằng `try/catch` hoặc `.catch`.
- Viết được custom error class để phân loại lỗi.

## 3. TypeScript nền tảng

Thời lượng gợi ý: 4-5 ngày.

Đọc:

- `learning-guides/02-typescript/base/01-basic-types-inference.md`
- `learning-guides/02-typescript/base/02-type-interface-functions.md`
- `learning-guides/02-typescript/base/03-narrowing-classes.md`

Chạy:

```powershell
npm run ts:types
npm run ts:contracts
npm run ts:narrowing
```

Trọng tâm:

- Basic types.
- Type inference.
- `unknown` thay vì `any`.
- `type` vs `interface`.
- Function contract.
- Narrowing bằng `typeof`, `instanceof`, discriminated union.
- Class, `private`, `readonly`.

Kết quả cần đạt:

- Annotate đúng các boundary quan trọng như DTO, service input/output.
- Không dùng `any` để né type.
- Biết dùng `unknown` và kiểm tra trước khi truy cập.
- Chọn được `type` hoặc `interface` theo tình huống.

## 4. TypeScript nâng cao

Thời lượng gợi ý: 4-6 ngày.

Đọc:

- `learning-guides/02-typescript/advanced/01-generics.md`
- `learning-guides/02-typescript/advanced/02-utility-mapped-conditional.md`
- `learning-guides/02-typescript/advanced/03-architecture-patterns.md`

Chạy:

```powershell
npm run ts:generics
npm run ts:utilities
npm run ts:unions
```

Trọng tâm:

- Generic function/class.
- Generic constraint.
- Generic repository.
- `Partial`, `Pick`, `Omit`, `Readonly`, `Record`.
- Mapped type.
- Conditional type.
- Discriminated union.
- Exhaustive check bằng `never`.

Kết quả cần đạt:

- Viết được repository generic có constraint.
- Tạo DTO type từ domain type mà không lộ field nhạy cảm.
- Dùng discriminated union để model hóa nhiều biến thể dữ liệu.
- Biết dừng lại khi type quá phức tạp và cần tách tên rõ ràng.

## 5. Node.js core

Thời lượng gợi ý: 5-7 ngày.

Đọc:

- `learning-guides/03-nodejs/core/01-runtime-modules-globals.md`
- `learning-guides/03-nodejs/core/02-events-fs-path-http.md`

Chạy:

```powershell
npm run node:modules
npm run node:events
npm run node:fs
npm run node:http:once
```

Trọng tâm:

- V8, libuv, non-blocking I/O.
- CommonJS vs ES Modules.
- `process`, `Buffer`, `__dirname`, `__filename`.
- `EventEmitter`.
- `fs/promises`.
- `path.join`.
- HTTP server gốc bằng `node:http`.

Kết quả cần đạt:

- Biết Express/Nest đang đứng trên HTTP server của Node.
- Biết đọc/ghi file async đúng cách.
- Biết dùng `path` thay vì nối chuỗi đường dẫn.
- Tạo được HTTP server không dùng framework để hiểu request/response thật.

## 6. Node.js nâng cao

Thời lượng gợi ý: 4-6 ngày.

Đọc:

- `learning-guides/03-nodejs/advanced/01-stream-buffer-child-process.md`
- `learning-guides/03-nodejs/advanced/02-performance-concurrency-security.md`

Chạy:

```powershell
npm run node:streams
npm run node:buffer
npm run node:child
```

Trọng tâm:

- Buffer và binary data.
- Crypto cơ bản.
- Stream và `pipeline`.
- Backpressure.
- Child process.
- Event loop delay.
- Security checklist cho Node app.

Kết quả cần đạt:

- Biết khi nào dùng stream thay vì load toàn bộ file vào memory.
- Biết không dùng hash thường như SHA trực tiếp cho password.
- Biết tránh ghép shell command từ user input.
- Nhận diện được code có thể block event loop.

## 7. Express core

Thời lượng gợi ý: 4-5 ngày.

Đọc:

- `learning-guides/04-express/core/01-routing-middleware-request-response.md`
- `learning-guides/04-express/core/02-crud-api-validation-errors.md`

Chạy:

```powershell
npm run express:core:once
npm run express:core
```

Thử request thủ công:

```powershell
curl http://localhost:3002/health
curl http://localhost:3002/users
curl -X POST http://localhost:3002/users -H "Content-Type: application/json" -d "{\"email\":\"lan@example.com\"}"
```

Trọng tâm:

- `app.get`, `app.post`.
- `express.json`.
- Middleware order.
- Request/response object.
- CRUD resource.
- Validation thủ công.
- Error middleware.
- Async handler.

Kết quả cần đạt:

- Viết được REST API nhỏ bằng Express.
- Không để business logic nặng trong route.
- Biết chuẩn hóa error response.
- Biết vì sao route async cần wrapper hoặc cơ chế bắt lỗi rõ ràng.

## 8. Express nâng cao

Thời lượng gợi ý: 4-6 ngày.

Đọc:

- `learning-guides/04-express/advanced/01-architecture-security-upload.md`
- `learning-guides/04-express/advanced/02-production-readiness.md`

Chạy:

```powershell
npm run express:advanced:once
npm run express:advanced
```

Thử route protected:

```powershell
curl http://localhost:3003/users -H "Authorization: Bearer demo-token"
```

Trọng tâm:

- Tổ chức folder theo module.
- Auth middleware.
- Request id.
- Response envelope.
- Upload file bằng Multer.
- Giới hạn size/type.
- Config validation.
- Logging, graceful shutdown, health check.

Kết quả cần đạt:

- Thiết kế được Express app có module boundary rõ.
- Biết thêm middleware auth và gắn user vào request.
- Upload file an toàn hơn mức demo cơ bản.
- Có checklist production tối thiểu.

## 9. NestJS core

Thời lượng gợi ý: 4-5 ngày.

Đọc:

- `learning-guides/05-nestjs/core/01-modules-controllers-services.md`
- `learning-guides/05-nestjs/core/02-resource-crud-di.md`

Chạy:

```powershell
npm run nest:core:once
npm run nest:core
```

Trọng tâm:

- `@Module`.
- `@Controller`.
- `@Injectable`.
- Dependency injection.
- Controller gọi service.
- In-memory CRUD.
- DTO cơ bản.

Kết quả cần đạt:

- Hiểu "Module - Controller - Service" là xương sống của Nest.
- Biết controller chỉ nên xử lý HTTP boundary.
- Biết service giữ business logic.
- Viết được resource CRUD đầu tiên.

## 10. NestJS nâng cao

Thời lượng gợi ý: 8-12 ngày.

Đọc:

- `learning-guides/05-nestjs/advanced/01-request-lifecycle.md`
- `learning-guides/05-nestjs/advanced/02-persistence-auth-config.md`
- `learning-guides/05-nestjs/advanced/03-swagger-docker-quality.md`

Chạy:

```powershell
npm run nest:advanced:once
npm run nest:advanced
```

Thử route protected:

```powershell
curl http://localhost:3005/users -H "Authorization: Bearer demo-token"
```

Trọng tâm:

- Middleware.
- Guard.
- Pipe.
- DTO validation bằng `class-validator`.
- `ValidationPipe`.
- `ParseIntPipe`.
- Interceptor.
- Exception filter.
- Custom decorator.
- File upload.
- ConfigModule.
- Prisma/TypeORM.
- Passport, LocalStrategy, JwtStrategy.
- Swagger.
- Docker.
- ESLint, Prettier, Husky, Commitlint.

Kết quả cần đạt:

- Nắm được request lifecycle đầy đủ của Nest.
- Biết bảo vệ route bằng guard.
- Biết chuẩn hóa response bằng interceptor.
- Biết chuẩn hóa error bằng exception filter.
- Biết thiết kế auth JWT cơ bản.
- Biết đường đi từ app demo tới app production-ready.

## 11. Bài tập tổng hợp

Thời lượng gợi ý: 10-15 ngày.

Đọc:

- `learning-guides/06-practice/01-capstone-user-system.md`
- `learning-guides/06-practice/02-checklists.md`

Xây:

- User Management System bằng Express.
- User Management System bằng NestJS.

Các phase:

1. In-memory CRUD.
2. Validation, logger, request id, response envelope, error handler.
3. PostgreSQL bằng Prisma hoặc TypeORM.
4. Register, login, password hash, JWT.
5. Upload avatar `.jpg`, max 2MB.
6. Swagger/OpenAPI.
7. Dockerfile và docker-compose.
8. ESLint, Prettier, Husky, Commitlint.
9. Unit test service và e2e test API chính.

Tiêu chí hoàn thành:

- Không lộ password hash.
- Không dùng `any` ở boundary.
- Error response thống nhất.
- Route protected thật sự cần token.
- Config thiếu thì app fail sớm.
- Có README chạy local.
- `npm run check` pass.

## Lịch học mẫu 6 tuần

Tuần 1:

- JavaScript base.
- JavaScript advanced phần event loop và async.

Tuần 2:

- TypeScript base.
- TypeScript advanced.

Tuần 3:

- Node.js core.
- HTTP raw server.
- Stream, Buffer, child process.

Tuần 4:

- Express core.
- Express advanced.
- Làm User API bản Express in-memory.

Tuần 5:

- NestJS core.
- NestJS request lifecycle.
- Làm User API bản Nest in-memory.

Tuần 6:

- Database.
- Auth JWT.
- Upload.
- Swagger.
- Docker.
- Quality workflow.

## Cách tự đánh giá

Sau mỗi phần, tự trả lời:

- Phần này giải quyết vấn đề gì trong backend thực tế?
- Nếu bỏ phần này, hệ thống sẽ lỗi hoặc khó bảo trì ở đâu?
- Ví dụ code tương ứng nằm ở file nào?
- Script nào chạy được ví dụ đó?
- Có lỗi nào mình có thể cố tình tạo ra để kiểm chứng hiểu biết không?

Nếu trả lời chưa rõ, quay lại file Markdown nhỏ tương ứng trong `learning-guides/` và chạy lại ví dụ trong `examples/`.
