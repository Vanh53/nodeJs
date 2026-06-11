# NestJS Swagger, Docker và code quality

## Swagger/OpenAPI

Swagger giúp API self-document:

```ts
const config = new DocumentBuilder()
  .setTitle('User System')
  .setVersion('1.0')
  .build();
```

Controller nên có:

- `@ApiTags`
- `@ApiOperation`
- `@ApiResponse`
- DTO có `@ApiProperty`

## Dockerfile

Dockerfile production nên multi-stage:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
```

## Docker Compose

Compose dev thường có:

- app
- postgres
- redis

Không hard-code secret production vào compose file commit lên git.

## ESLint và Prettier

ESLint bắt lỗi code pattern. Prettier format code. Dùng `eslint-config-prettier` để tránh conflict rule format.

Rule nên cân nhắc:

- explicit return type cho public method
- no unused variables
- no floating promises
- no explicit any

## Husky và lint-staged

Pre-commit hook chạy check nhanh trước khi commit:

```powershell
npx husky init
```

`lint-staged` chỉ format/lint file staged, nhanh hơn chạy toàn repo.

## Commitlint

Conventional commits:

- `feat: add user login`
- `fix: handle jwt expiration`
- `docs: add api usage`

Commit message mơ hồ như `fixed stuff` nên bị reject.
