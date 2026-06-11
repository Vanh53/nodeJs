# OOP, `this` và prototype

## Class trong JavaScript

`class` là cú pháp hiện đại trên prototype.

```js
class User {
  constructor(email) {
    this.email = email;
  }
}
```

Method của class nằm trên prototype, không bị copy lại cho mỗi instance.

## Inheritance

```js
class Admin extends User {
  constructor(email, permissions) {
    super(email);
    this.permissions = permissions;
  }
}
```

`super()` gọi constructor của class cha.

## `this` binding

`this` phụ thuộc cách gọi:

```js
user.getEmail(); // this là user
const fn = user.getEmail;
fn(); // this bị mất trong strict mode
```

Cách xử lý:

- `bind(instance)`
- gọi qua wrapper arrow
- trong class framework, để framework gọi method thay vì tách method ra

## `call`, `apply`, `bind`

- `call(thisArg, a, b)`: gọi ngay với danh sách argument.
- `apply(thisArg, [a, b])`: gọi ngay với array argument.
- `bind(thisArg)`: trả function mới đã gắn `this`.

## Khi nào dùng OOP trong backend

- Entity/value object có behavior rõ.
- Service giữ dependency qua constructor.
- Strategy pattern cho auth/payment/storage.
- Repository abstraction.

Không nên biến mọi data object thành class nếu chỉ cần DTO đơn giản.

## Ví dụ chạy

```powershell
npm run js:oop
```
