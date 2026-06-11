# Generics

Generics cho phép viết code tái sử dụng nhưng vẫn giữ type an toàn.

## Generic function

```ts
function identity<T>(value: T): T {
  return value;
}
```

`T` là type parameter. TypeScript có thể infer `T` từ argument.

## Generic constraint

Khi generic cần một shape tối thiểu:

```ts
type Entity = { id: string };

class Repository<T extends Entity> {}
```

`T extends Entity` nghĩa là mọi `T` phải có `id`.

## Generic repository

Repository generic giúp tái dùng cho `User`, `Post`, `Product`:

```ts
class InMemoryRepository<T extends { id: string }> {
  private items = new Map<string, T>();
}
```

## Khi nào không dùng generic

Không dùng generic nếu chỉ có một type cụ thể. Generic chỉ đáng dùng khi logic thật sự độc lập với type dữ liệu.

## Generic trong Nest/Express

- API response wrapper: `ApiResponse<T>`.
- Repository contract: `Repository<T>`.
- Pagination result: `Page<T>`.
- Event payload map: `EventMap<TName, TPayload>`.

## Ví dụ chạy

```powershell
npm run ts:generics
```
