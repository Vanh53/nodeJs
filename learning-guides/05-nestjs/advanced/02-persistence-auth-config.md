# NestJS persistence, auth và config

## Persistence

Chọn ORM:

- Prisma: developer experience tốt, schema rõ.
- TypeORM: decorator/entity style, tích hợp Nest lâu đời.

Service không nên phụ thuộc chi tiết SQL nếu không cần. Tạo repository hoặc dùng ORM client/provider được inject.

## PostgreSQL bằng Docker

Trong project thật, chạy PostgreSQL qua Docker Compose để dev environment lặp lại được.

Biến môi trường thường có:

- `DATABASE_URL`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

## Authentication

Flow cơ bản:

1. User gửi email/password.
2. Server validate credential.
3. Server ký JWT.
4. Client gửi `Authorization: Bearer <token>`.
5. JWT strategy verify token.
6. Guard cho request đi tiếp.

## Passport strategies

- `LocalStrategy`: xử lý login bằng credential.
- `JwtStrategy`: verify token cho route protected.

## Guards

```ts
@UseGuards(JwtAuthGuard)
@Get('me')
me(@CurrentUser() user: User) {}
```

Guard nên tập trung auth/permission, không chứa business rule không liên quan.

## ConfigModule

`@nestjs/config` gom config:

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```

Nên validate env bằng Joi/Zod để app fail ngay khi thiếu config quan trọng.

## File upload

Nest dùng Multer qua interceptor:

```ts
@UseInterceptors(FileInterceptor('avatar'))
```

Luôn validate size/type và không tin filename từ client.
