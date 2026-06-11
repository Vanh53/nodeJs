# TypeScript architecture patterns

## Discriminated union

Dùng khi object có nhiều biến thể rõ ràng:

```ts
type Payment =
  | { kind: 'card'; last4: string }
  | { kind: 'bank'; accountNumber: string };
```

Switch theo `kind` giúp TypeScript narrow chính xác.

## Exhaustive check

`assertNever` giúp compiler báo khi quên xử lý case mới:

```ts
function assertNever(value: never): never {
  throw new Error(String(value));
}
```

## Result type

Thay vì throw ở mọi nơi, một số layer có thể trả result:

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

Pattern này phù hợp cho domain logic. Ở controller, bạn có thể convert error thành HTTP exception.

## Branded type

Khi muốn phân biệt hai string khác nghĩa:

```ts
type UserId = string & { readonly brand: unique symbol };
```

Không cần dùng branded type quá sớm, nhưng hữu ích ở hệ thống lớn.

## Boundary typing

Các boundary nên có type rõ:

- HTTP request DTO
- database entity
- message queue payload
- external API response
- config/env schema

## Ví dụ chạy

```powershell
npm run ts:unions
```
