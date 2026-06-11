# NestJS core: modules, controllers và services

Nest tổ chức app bằng ba thành phần nền tảng:

- Module
- Controller
- Service/provider

## Module

Module là boundary kiến trúc:

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
class UsersModule {}
```

Module gom các controller/provider liên quan và khai báo dependency graph cho Nest DI container.

## Controller

Controller nhận HTTP request:

```ts
@Controller('users')
class UsersController {
  @Get()
  findAll() {}
}
```

Controller không nên chứa business logic nặng.

## Service

Service chứa business logic:

```ts
@Injectable()
class UsersService {}
```

Service được inject vào controller qua constructor.

## Dependency injection

Nest tạo instance provider và inject dependency dựa trên metadata decorator.

Lợi ích:

- tách layer rõ
- dễ mock trong test
- dễ thay implementation
- quản lý lifecycle tập trung

## Ví dụ chạy

```powershell
npm run nest:core:once
```
