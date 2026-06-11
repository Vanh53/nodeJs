# Cài đặt thủ công

Các file đã được tạo sẵn trong workspace này. Nếu cần tự dựng lại bằng tay trên máy khác, làm theo các bước dưới đây.

## Yêu cầu môi trường

- Node.js 20+; workspace hiện tại đang dùng Node `v22.15.1`.
- npm 10+.
- VS Code hoặc editor có hỗ trợ TypeScript.
- Docker Desktop nếu muốn thực hành PostgreSQL, Redis, Docker Compose ở phần NestJS production.

## Cài dependencies

Từ thư mục root:

```powershell
cd "g:\VS Code\Node-Express_Nest"
npm install
```

Lệnh này cài các nhóm chính:

- Runtime: `express`, `@nestjs/*`, `reflect-metadata`, `rxjs`, `class-validator`, `class-transformer`, `multer`, `passport`, `bcryptjs`, `joi`.
- Tooling: `typescript`, `tsx`, `cross-env`, `eslint`, `prettier`, `husky`, `lint-staged`, `commitlint`.
- Type definitions: `@types/node`, `@types/express`, `@types/multer`, `@types/passport-*`.

## Kiểm tra type

```powershell
npm run check
```

## Chạy nhanh một bộ ví dụ đại diện

```powershell
npm run examples:quick
```

## Cài Nest CLI nếu muốn tạo project thật

Các ví dụ trong repo này chạy trực tiếp bằng `tsx`, không bắt buộc Nest CLI. Nhưng khi làm project thật, nên cài:

```powershell
npm install -g @nestjs/cli
nest new user-system
cd user-system
nest g resource users
```

## Cài Docker DB thủ công cho bài Nest persistence

Tạo `docker-compose.yml` trong project Nest thật:

```yaml
services:
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: user_system
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Chạy:

```powershell
docker compose up -d
```
