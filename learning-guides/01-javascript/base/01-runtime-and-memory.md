# Runtime và memory

JavaScript chạy trong runtime. Trên backend, runtime phổ biến là Node.js. Node kết hợp V8 engine, libuv và các module core để chạy JavaScript ngoài trình duyệt.

## Thành phần cần hiểu

- V8: parse, compile và execute JavaScript.
- Call stack: nơi chạy function đồng bộ.
- Heap: nơi lưu object, array, function và dữ liệu động.
- libuv: xử lý non-blocking I/O, timer, file system, network.
- Event loop: đưa callback đã sẵn sàng quay lại call stack.

## Stack và heap

Primitive như `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` thường được xử lý như giá trị. Khi gán primitive sang biến khác, bạn đang copy value.

Object, array và function là reference value. Biến giữ địa chỉ trỏ tới dữ liệu trong heap. Khi gán `objB = objA`, hai biến cùng trỏ tới một object.

## Reference trap

Lỗi hay gặp:

```js
const userA = { profile: { roles: ['user'] } };
const userB = userA;
userB.profile.roles.push('admin');
```

`userA` cũng bị đổi vì `userA` và `userB` cùng trỏ tới một object.

## Shallow copy và deep copy

Shallow copy bằng spread hoặc `Object.assign` chỉ copy tầng đầu:

```js
const copy = { ...user };
```

Nếu object có nested object, phần nested vẫn dùng chung reference.

Deep copy bằng `structuredClone()` phù hợp với dữ liệu JSON-like, Date, Map, Set và nhiều kiểu built-in khác:

```js
const deepCopy = structuredClone(user);
```

## Khi nào cần immutability

- Khi update state trong frontend.
- Khi tránh mutation ngoài ý muốn trong service/backend.
- Khi ghi log/audit cần snapshot dữ liệu.
- Khi truyền object qua nhiều layer.

## Ví dụ chạy

```powershell
npm run js:memory
```
