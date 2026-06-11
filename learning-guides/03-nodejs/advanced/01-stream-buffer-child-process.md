# Streams, Buffer và child process

## Buffer

Buffer là cách Node xử lý binary data:

- file upload
- network packet
- image/pdf
- crypto input/output

Không convert binary sang string nếu không cần; có thể làm hỏng dữ liệu.

## Crypto

`node:crypto` dùng cho hash, random bytes, uuid, signature, encryption. Với password, không dùng SHA trực tiếp; dùng bcrypt, argon2 hoặc scrypt.

`timingSafeEqual` giúp so sánh secret giảm rủi ro timing attack, nhưng hai buffer phải cùng độ dài.

## Streams

Stream xử lý dữ liệu theo chunk, tránh load toàn bộ file lớn vào memory.

Loại stream:

- Readable
- Writable
- Duplex
- Transform

Luôn ưu tiên `pipeline` vì nó xử lý backpressure và error tốt hơn tự `.pipe()` thủ công.

## Child process

Child process dùng để chạy command ngoài hoặc tách tác vụ khỏi process chính.

API phổ biến:

- `exec`: chạy command qua shell, tiện nhưng rủi ro injection nếu ghép string.
- `execFile`: chạy binary trực tiếp, an toàn hơn khi truyền args.
- `spawn`: stream stdout/stderr, phù hợp process dài.
- `fork`: chạy Node child process.

## Ví dụ chạy

```powershell
npm run node:streams
npm run node:buffer
npm run node:child
```
