# Functions, scope và closures

## Các kiểu khai báo function

Function declaration:

```js
function sum(a, b) {
  return a + b;
}
```

Function expression:

```js
const sum = function (a, b) {
  return a + b;
};
```

Arrow function:

```js
const sum = (a, b) => a + b;
```

## `this` trong function

Function thường có `this` phụ thuộc cách gọi:

```js
service.run();
```

Arrow function không tự bind `this`; nó lấy `this` từ lexical scope bên ngoài. Vì vậy arrow function không phù hợp làm method cần dùng `this` của object.

## Scope

- Global scope: toàn file/process.
- Function scope: biến sống trong function.
- Block scope: biến `let`/`const` sống trong `{}`.

## Closure

Closure xảy ra khi function nhớ được biến ở scope bên ngoài dù scope đó đã chạy xong.

Ứng dụng:

- private state
- function factory
- memoization
- callback giữ context
- dependency injection đơn giản

Ví dụ counter:

```js
function createCounter() {
  let value = 0;
  return () => ++value;
}
```

`value` không truy cập trực tiếp từ ngoài nhưng function trả về vẫn nhớ nó.

## Lỗi thường gặp

- Truyền method làm callback rồi mất `this`.
- Dùng closure giữ reference lớn quá lâu gây memory leak.
- Dùng arrow function cho class method cần dynamic `this`.

## Ví dụ chạy

```powershell
npm run js:functions
```
