# Variables, data types và operators

## `var`, `let`, `const`

`var` có function scope và bị hoist thành `undefined`, dễ tạo bug. Trong code hiện đại, chỉ nên dùng `let` và `const`.

`let` và `const` có block scope. Trước dòng khai báo, biến nằm trong Temporal Dead Zone, truy cập sẽ throw `ReferenceError`.

Quy tắc thực tế:

- Dùng `const` mặc định.
- Dùng `let` khi cần gán lại.
- Không dùng `var` trong code mới.

## Primitive và reference

Primitive:

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `symbol`
- `bigint`

Reference:

- object
- array
- function
- class instance

## Equality

`==` ép kiểu ngầm nên dễ sai:

```js
0 == false; // true
'' == false; // true
```

`===` so sánh strict, nên dùng mặc định:

```js
0 === false; // false
```

## Optional chaining

Dùng khi property có thể không tồn tại:

```js
const city = user.profile?.address?.city;
```

Nếu một đoạn giữa là `null` hoặc `undefined`, kết quả là `undefined` thay vì throw.

## Nullish coalescing

`??` chỉ fallback khi vế trái là `null` hoặc `undefined`:

```js
const limit = input.limit ?? 20;
```

Khác với `||`, `??` không coi `0`, `false`, `''` là missing value.

## Ví dụ chạy

```powershell
npm run js:variables
```
