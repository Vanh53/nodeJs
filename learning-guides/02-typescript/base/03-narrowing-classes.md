# Narrowing và classes

## Narrowing

Narrowing là quá trình TypeScript thu hẹp type sau khi kiểm tra điều kiện.

```ts
function print(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

Các cách narrow phổ biến:

- `typeof`
- `instanceof`
- kiểm tra property bằng `in`
- discriminated union
- custom type guard

## Class

Class trong TypeScript có thêm modifier:

- `public`
- `private`
- `protected`
- `readonly`

Ví dụ value object:

```ts
class Email {
  private constructor(private readonly value: string) {}
}
```

Constructor private buộc người dùng tạo object qua factory method, nơi có validation.

## Discriminated union cơ bản

```ts
type Result =
  | { ok: true; data: User }
  | { ok: false; error: string };
```

Khi check `result.ok`, TypeScript biết branch nào có `data`, branch nào có `error`.

## Khi dùng class, khi dùng plain object

Dùng class khi:

- có invariant cần bảo vệ
- có behavior gắn với dữ liệu
- cần DI trong Nest service/provider

Dùng plain object khi:

- chỉ truyền data
- DTO đơn giản
- serialize JSON

## Ví dụ chạy

```powershell
npm run ts:narrowing
```
