# Basic types và inference

TypeScript thêm type system vào JavaScript. Runtime vẫn là JavaScript, nhưng compiler kiểm tra type trước khi chạy.

## Type cơ bản

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `unknown`
- `void`
- array: `string[]`
- tuple: `[number, string]`
- union: `'active' | 'disabled'`

## Type inference

Không cần annotate mọi thứ:

```ts
const email = 'lan@example.com'; // string
```

Nên annotate ở boundary:

- function parameter
- return type public method
- DTO
- API response
- repository/service contract

## `unknown` thay vì `any`

`any` tắt kiểm tra type. `unknown` buộc bạn kiểm tra trước khi dùng:

```ts
function normalize(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  return '';
}
```

## `void`

`void` dùng cho function không trả dữ liệu hữu ích:

```ts
function log(message: string): void {
  console.log(message);
}
```

## Literal union

```ts
type UserStatus = 'active' | 'disabled';
```

Union giúp hạn chế value hợp lệ và tránh string tự do.

## Ví dụ chạy

```powershell
npm run ts:types
```
