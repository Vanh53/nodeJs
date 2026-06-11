# Bài tập tổng hợp: User Management System

Mục tiêu là xây hệ thống user từ đơn giản tới production-ready.

## Phase 1: In-memory API

Yêu cầu:

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

Luật:

- email bắt buộc và phải hợp lệ
- displayName ít nhất 2 ký tự
- email không được trùng

Làm trước bằng Express, sau đó làm lại bằng Nest.

## Phase 2: Request lifecycle

Thêm:

- request logger middleware
- validation layer
- response envelope `{ data, meta }`
- centralized error handler/filter
- request id

## Phase 3: Persistence

Thêm PostgreSQL bằng Prisma hoặc TypeORM.

Yêu cầu:

- migration/schema rõ
- unique email ở database
- service không dùng array nữa
- có seed data

## Phase 4: Auth

Thêm:

- register
- login
- password hash bằng bcrypt/argon2
- JWT access token
- guard route `GET /users`
- `@CurrentUser()` trong Nest hoặc `req.user` typed trong Express

## Phase 5: Utilities

Thêm:

- config validation
- upload avatar `.jpg`, max 2MB
- Swagger/OpenAPI
- Dockerfile
- docker-compose app + db

## Phase 6: Quality workflow

Thêm:

- `npm run check`
- `npm run lint`
- `npm run format`
- pre-commit hook
- commitlint
- CI pipeline chạy typecheck/test

## Tiêu chí hoàn thành

- API trả error format thống nhất.
- Không lộ password hash.
- Không dùng `any` ở boundary.
- Không có route async bỏ quên error.
- Có README hướng dẫn chạy local.
- Có ít nhất unit test service và e2e test API chính.
