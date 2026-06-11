# Utility, mapped và conditional types

## Utility types phổ biến

`Partial<T>`: tất cả property thành optional.

`Required<T>`: tất cả property thành required.

`Pick<T, K>`: chọn một số property.

`Omit<T, K>`: loại bỏ một số property.

`Readonly<T>`: không cho gán lại property.

`Record<K, V>`: object map từ key sang value.

## DTO từ domain type

Không trả password hash ra API:

```ts
type PublicUser = Omit<User, 'passwordHash'>;
```

Input tạo user:

```ts
type CreateUserInput = Pick<User, 'email' | 'passwordHash'>;
```

Patch user:

```ts
type UserPatch = Partial<Pick<User, 'email' | 'displayName'>>;
```

## Mapped type

Mapped type tạo type mới bằng cách duyệt key:

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

## Conditional type

Conditional type chọn type theo điều kiện:

```ts
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
```

## Cẩn thận

Utility type mạnh nhưng có thể làm type khó đọc. Nếu type quá phức tạp, tách ra tên rõ ràng và viết test type bằng ví dụ usage.

## Ví dụ chạy

```powershell
npm run ts:utilities
```
