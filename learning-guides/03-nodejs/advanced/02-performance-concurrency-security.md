# Performance, concurrency và security trong Node.js

## Event loop delay

Nếu event loop bị block, mọi request đều chậm. Nguyên nhân:

- vòng lặp CPU-heavy
- JSON parse/stringify payload quá lớn
- sync filesystem
- regex quá nặng
- crypto sync quá lớn

## Khi nào cần worker thread

Dùng worker thread cho CPU-heavy task:

- image processing
- encryption/hash lớn
- report generation
- data transformation lớn

Không dùng worker thread cho I/O thông thường; async I/O đã đủ.

## Cluster và horizontal scaling

Node process đơn chỉ dùng một main JS thread. Production thường scale bằng:

- nhiều process qua PM2/systemd/container
- Kubernetes replica
- load balancer

Cluster có thể dùng nhưng trong hệ thống container hiện đại, scale nhiều container thường rõ ràng hơn.

## Security checklist

- Không ghép shell command bằng string từ user input.
- Validate file upload: type, size, extension, storage path.
- Không log secret/token/password.
- Set timeout cho HTTP client.
- Dùng `helmet` trong Express/Nest nếu public API.
- Giới hạn body size.
- Rate limit endpoint nhạy cảm.

## Observability

Production cần:

- structured logging
- request id/correlation id
- metrics latency/error rate
- health check
- graceful shutdown

## Bài tập

1. Viết endpoint upload file dùng stream thay vì load cả file vào memory.
2. Tạo CPU-heavy function rồi đo event loop delay.
3. Chuyển CPU-heavy function sang worker thread.
