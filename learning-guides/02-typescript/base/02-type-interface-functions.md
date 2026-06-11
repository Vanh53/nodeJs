# Type, interface và function contracts

## Interface

Interface phù hợp cho object contract và class implementation:

```ts
interface Repository<T> {
  findById(id: string): T | undefined;
}
```

Interface có thể được merge declaration, hữu ích khi mở rộng type từ thư viện.

## Type alias

Type phù hợp cho:

- union
- tuple
- primitive alias
- function type
- mapped/conditional type

```ts
type Role = 'reader' | 'admin';
type Handler = (id: string) => Promise<void>;
```

## Chọn type hay interface

Quy tắc thực tế:

- Dùng `interface` cho object contract public và class `implements`.
- Dùng `type` cho union, composition phức tạp và utility type.
- Không tranh luận quá lâu; quan trọng là nhất quán trong project.

## Function return type

Service public method nên có return type rõ:

```ts
create(input: CreateUserInput): User {
  return user;
}
```

Điều này giúp refactor an toàn hơn.

## Generic interface

```ts
interface Repository<T> {
  findById(id: string): T | undefined;
}
```

Generic giúp tái sử dụng contract cho nhiều entity.

## Ví dụ chạy

```powershell
npm run ts:contracts
```
