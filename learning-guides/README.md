# Lộ trình học JS, TS, Node.js, Express và NestJS

Bộ tài liệu này được tách từ 2 roadmap gốc:

- `nodejs-core.md`: nền tảng JavaScript, TypeScript và Node.js core.
- `nestjs-core.md`: lộ trình xây dựng hệ thống NestJS thực tế.

Mục tiêu là học theo từng phần nhỏ, mỗi phần có lý thuyết, lỗi thường gặp, bài tập và ví dụ chạy được trong thư mục `examples/`.

## Cách học đề xuất

1. Đọc `00-setup` để biết cách cài và chạy ví dụ.
2. Học `01-javascript/base` trước khi qua `advanced`.
3. Học `02-typescript` ngay sau JavaScript để có nền tảng type.
4. Học `03-nodejs` để hiểu runtime, I/O, event, stream và HTTP gốc.
5. Học `04-express` để xây REST API bằng framework mỏng.
6. Học `05-nestjs` để chuyển sang kiến trúc module, DI, lifecycle, auth, docs và production workflow.
7. Làm bài tổng hợp ở `06-practice`.

## Bản đồ thư mục

- `00-setup`: cài đặt, npm scripts, cách chạy thủ công.
- `01-javascript`: syntax, memory, function, closure, event loop, async, OOP, error.
- `02-typescript`: type cơ bản, interface/type, narrowing, generics, utility types.
- `03-nodejs`: module system, globals, EventEmitter, fs/path, HTTP raw, stream, buffer, child process.
- `04-express`: routing, middleware, validation, error handling, upload, security, production.
- `05-nestjs`: module/controller/service, DI, lifecycle, validation, guards, filters, interceptors, DB, auth, Swagger, Docker, quality.
- `06-practice`: bài tập tổng hợp và checklist.

## Nguyên tắc học

- Không học thuộc API rời rạc. Mỗi API phải gắn với một luồng request, một dữ liệu hoặc một lỗi thật.
- Luôn chạy ví dụ sau khi đọc lý thuyết.
- Khi học backend, ưu tiên hiểu request lifecycle: request đi qua middleware, guard, pipe/validation, controller, service, interceptor và error handler như thế nào.
- Khi code TypeScript, không dùng `any` để né lỗi. Nếu chưa biết type, dùng `unknown` rồi narrow.
- Khi xây API, luôn nghĩ tới input validation, error response, logging, security và khả năng test.
