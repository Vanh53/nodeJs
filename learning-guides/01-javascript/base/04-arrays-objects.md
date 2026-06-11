# Arrays và objects

## Array methods quan trọng

`map`: biến đổi từng phần tử, trả array mới.

```js
const emails = users.map((user) => user.email);
```

`filter`: giữ lại phần tử đạt điều kiện.

```js
const adults = users.filter((user) => user.age >= 18);
```

`reduce`: gom array thành một giá trị.

```js
const total = orders.reduce((sum, order) => sum + order.amount, 0);
```

`find`: lấy phần tử đầu tiên thỏa điều kiện.

`flatMap`: map rồi flatten một cấp, hữu ích khi mỗi item sinh ra nhiều item con.

## Object patterns

Destructuring:

```js
const { password, ...publicUser } = user;
```

Dynamic keys:

```js
const key = 'lastLoginAt';
const user = { [key]: new Date().toISOString() };
```

`Object.entries()` để duyệt key-value:

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

## Mutating và non-mutating

Mutating:

- `push`
- `pop`
- `splice`
- gán property trực tiếp

Non-mutating:

- `map`
- `filter`
- `slice`
- spread `[...]`, `{...}`

Trong service backend, mutation không sai, nhưng phải rõ ownership. Nếu object được share qua nhiều layer, ưu tiên tạo object mới.

## Ví dụ chạy

```powershell
npm run js:data
```
