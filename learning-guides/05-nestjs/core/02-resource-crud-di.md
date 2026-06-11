# NestJS resource CRUD và DI

## Tạo resource bằng CLI

Trong project Nest thật:

```powershell
nest g resource users
```

CLI có thể tạo:

- module
- controller
- service
- DTO
- entity
- test skeleton

## In-memory CRUD

Phase đầu nên dùng array trong service:

```ts
private readonly users: User[] = [];
```

Mục tiêu là hiểu flow trước khi thêm database.

## DTO

DTO định nghĩa dữ liệu vào/ra:

```ts
class CreateUserDto {
  email: string;
}
```

Khi thêm validation, DTO nên là class để decorator `class-validator` hoạt động.

## Controller gọi service

```ts
@Post()
create(@Body() body: CreateUserDto) {
  return this.usersService.create(body);
}
```

Controller không nên tự push vào array hoặc query database trực tiếp.

## Repository sau này

Khi có DB, service không query raw SQL rải rác. Service gọi repository/ORM:

```ts
return this.usersRepository.save(user);
```

## Bài tập

1. Thêm `PATCH /users/:id`.
2. Thêm `DELETE /users/:id`.
3. Nếu không tìm thấy user, throw `NotFoundException`.
4. Viết service method có return type rõ.
