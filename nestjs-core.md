# The Complete NestJS Engineering Roadmap

*Philosophy: Build a "User Management System" module by module. Moving from an empty shell to a production-ready application.*


## PHASE 1: THE CORE SKELETON
*Goal: Understand the "Holy Trinity" (Module - Controller - Service).*

### 1. Concepts
- **Modules (`@Module`)**: The architectural building blocks. Basics of Dependency Injection (DI).
- **Controllers (`@Controller`)**: Handling incoming HTTP Requests and Routing.
- **Services (`@Injectable`)**: Business Logic layer (Separation of Concerns).

### Practice Task
1.  **Setup**: Run `nest new user-system`.
2.  **Scaffold**: Run `nest g resource users`.
3.  **Mock Logic**:
    - Create a simple in-memory array: `private users = []`.
    - Implement `create`, `findAll`, `findOne` methods.
    - Connect the Controller to the Service.

> **Outcome**: An in-memory CRUD API. Data is lost on server restart.


## PHASE 2: THE REQUEST LIFECYCLE & VALIDATION
*Goal: Master how data flows, is validated, and how errors are handled.*

### 2. Middleware (The Gatekeeper)
- **Concept**: Express-style functions that run *before* the Route Handler.
- **Use Case**: Logging, CORS, Headers.
- **Task**: Create a `LoggerMiddleware` to log `req.method` and `req.url` for every incoming request.

### 3. Pipes & DTOs (The Validator)
- **DTO (Data Transfer Object)**: Defining strict input shapes using TS Classes.
- **Pipes**:
    - **Validation**: Using `class-validator` and `ValidationPipe` to enforce DTO rules (e.g., `@IsEmail`).
    - **Transformation**: Using `ParseIntPipe` to convert URL params (String -> Number).
- **Task**: Create `CreateUserDto`, add validation rules, and apply the global `ValidationPipe`.

### 4. Interceptors (The Wrapper)
- **Concept**: Logic that binds *before and after* method execution.
- **Use Case**: Transforming Response data into a standard format.
- **Task**: Create a `TransformInterceptor` to wrap all responses in `{ data: ..., meta: ... }`.

### 5. Exception Filters (The Safety Net)
- **Concept**: Centralized Error Handling.
- **Use Case**: Catching crashes and returning clean JSON instead of stack traces.
- **Task**: Create an `HttpExceptionFilter` to customize 400/500 errors (adding timestamps/paths).

> **Outcome**: Robust Data Flow:
> Request → Middleware → Guard → Pipe → Controller → Interceptor → Filter (if error).


## PHASE 3: PERSISTENCE (DATABASE)
*Goal: Storing data permanently.*

### 6. Database Integration
- **ORM**: TypeORM or Prisma (Recommended).
- **Entities**: Defining the `User` table structure in TypeScript.
- **Repository Pattern**: Injecting Repositories instead of querying SQL directly.

### Practice Task
1.  **Docker**: Run PostgreSQL via `docker-compose`.
2.  **Connect**: Configure TypeORM/Prisma in `AppModule`.
3.  **Refactor**: Update `UsersService` to save users to the real DB instead of the array.

> **Outcome**: Persistent data storage with structured tables.


## PHASE 4: SECURITY & AUTHENTICATION
*Goal: Protect the system.*

### 7. Authentication
- **Passport.js**: Integration with `@nestjs/passport`.
- **Strategies**: `LocalStrategy` (Login) and `JwtStrategy` (Verify Token).
- **JWT**: Generating and verifying JSON Web Tokens.

### 8. Guards (The Police)
- **Concept**: Determining if a request is *allowed* to proceed.
- **Task**: Create `JwtAuthGuard` and protect the `GET /users` route.

### 9. Custom Decorators
- **Concept**: Extracting data cleanly from the Request object.
- **Task**: Create `@CurrentUser()` to get the logged-in user instance directly in the Controller arguments.

> **Outcome**: Secured API. Only users with a valid Token can access data.


## PHASE 5: REAL-WORLD UTILITIES
*Goal: Production-ready features.*

### 10. Configuration
- **ConfigModule**: Managing `.env` variables (DB_HOST, JWT_SECRET).
- **Validation**: Using `Joi` schema to crash the app immediately if env vars are missing.

### 11. File Uploads
- **Multer**: Handling `multipart/form-data`.
- **Task**: Create an endpoint to upload User Avatars (validate `.jpg` only, max 2MB).


## PHASE 6: DEVOPS & DOCS
*Goal: Handover and Deployment.*

### 12. Documentation
- **Swagger (OpenAPI)**: Auto-generating API Docs.
- **Task**: Install `@nestjs/swagger`, add `@ApiTags`, `@ApiResponse` decorators to Controllers.

### 13. Docker & Deployment
- **Containerization**: Writing a `Dockerfile` for the NestJS app.
- **Orchestration**: Running App + DB + Redis using `docker-compose up`.


## PHASE 7: CODE QUALITY & WORKFLOW (The Standard)
*Goal: Automate discipline. Prevent "bad code" from ever entering the codebase.*

### 14. Linter & Formatter (ESLint + Prettier)
- **Concept**:
    - **ESLint**: Catches logic errors and bad practices (e.g., unused variables).
    - **Prettier**: Enforces consistent styling (indentation, quotes).
- **Task**:
    - Customize `.eslintrc.js`: Add rules like `explicit-function-return-type` to force Typescript return types.
    - Customize `.prettierrc`: Set `singleQuote: true`, `trailingComma: 'all'`.
    - **Conflict Resolution**: Ensure ESLint doesn't fight with Prettier (using `eslint-config-prettier`).

### 15. Git Hooks (Husky & Lint-Staged)
- **Concept**: Running scripts automatically *before* git actions.
- **Husky**: The tool that triggers Git hooks.
- **Lint-Staged**: Only run checks on files that are currently staged (changed), not the whole project.
- **Task**:
    - Install `husky` and `lint-staged`.
    - **Pre-commit Hook**: Configure Husky to run `npm run lint` and `npm run format` before allowing a commit.
    - **Result**: If the code has errors, the commit fails automatically.

### 16. Commit Standards (Commitlint)
- **Concept**: Enforcing "Conventional Commits" (e.g., `feat: add user login`, `fix: database connection`).
- **Task**:
    - Install `@commitlint/cli` and `@commitlint/config-conventional`.
    - Add a **Commit-msg Hook** in Husky.
    - **Result**: If a dev types `git commit -m "fixed stuff"`, it fails. It must be `fix: resolve db connection issue`.

> **Outcome**: Zero tolerance for messy code. The CI/CD pipeline never breaks due to syntax errors because they are caught locally.


### Summary Checklist
- [ ] **Skeleton**: Modules, Controllers, Services.
- [ ] **Lifecycle**: Middleware -> Pipes -> Interceptors -> Filters.
- [ ] **DB**: TypeORM/Prisma + Postgres.
- [ ] **Auth**: JWT + Passport + Guards.
- [ ] **Ops**: Config + Docker + Swagger.
- [ ] **Quality**: ESLint + Prettier + Husky + Commitlint.