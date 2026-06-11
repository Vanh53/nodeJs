# HN2 Roadmap: JS, TS & Node.js Core

*A definitive path focusing on system internals, memory management, and pure engineering principles.*


## PHASE 1: JAVASCRIPT CORE (The Foundation)
*Goal: Master the language syntax and memory model.*

### 1. Introduction & Environment
- **Node.js Overview**: V8 Engine, Non-blocking I/O, Single-threaded architecture.
- **Environment**: NPM, `package.json`, VS Code setup.

### 2. Memory Mechanics (Deep Dive)
- **Stack vs Heap**:
    - **Stack**: Stores Primitives (Fixed size).
    - **Heap**: Stores References (Objects/Arrays - Dynamic size).
- **The Reference Trap**: Understanding why `objA = objB` copies the *address*, not the *value*.
- **Immutability**:
    - **Shallow Copy**: Spread operator (`...`), `Object.assign`.
    - **Deep Copy**: `structuredClone()`.

### 3. Variables & Data Types
- **Variables**:
    - `var`: Deprecated (Hoisting issues).
    - `let` vs `const`: Block Scope & Temporal Dead Zone (TDZ).
- **Primitives**: String, Number, Boolean, Null, Undefined, Symbol.
- **References**: Object, Array, Function.

### 4. Operators & Logic
- **Equality**: `==` (Loose type conversion) vs `===` (Strict check).
- **Modern Operators**: Nullish Coalescing (`??`), Optional Chaining (`?.`).
- **Logic**: `&&`, `||`, `!`.

### 5. Functions & Scope
- **Types**: Declaration vs Expression vs Arrow Function (`this` context).
- **Scope**: Global, Function, Block.
- **Closures**: Mechanism for data privacy and state preservation.

### 6. Data Manipulation
- **Arrays**: `map`, `filter`, `reduce`, `find`, `flatMap`.
- **Objects**: Destructuring, Dynamic keys, `Object.entries()`.


## PHASE 2: ADVANCED ARCHITECTURE (The Engine)
*Goal: Understand how the code actually executes.*

### 7. Execution Context & Event Loop
- **Call Stack**: LIFO (Last In, First Out) execution.
- **Event Loop**:
    - Stack → APIs → Queue → Loop.

- **Task Queues**:
    - **Macrotasks**: `setTimeout`, `setInterval`.
    - **Microtasks**: `Promise` (Higher priority), `process.nextTick`.

### 8. Asynchronous Programming
- **Callbacks**: Handling async logic (and "Callback Hell").
- **Promises**: States (Pending, Fulfilled, Rejected), `.then()`, `.catch()`.
- **Async/Await**: Writing linear async code (Syntactic sugar).

### 9. Object-Oriented Programming (OOP)
- **Classes**: `class`, `constructor`.
- **Inheritance**: `extends`, `super`.
- **Context**: `this` binding (`bind`, `call`, `apply`).

### 10. Error Handling
- **Defensive Coding**: `try` / `catch` / `finally`.
- **Throwing**: `throw new Error("Custom Message")`.
- **Async Errors**: Handling rejections properly in `async` functions.


## PHASE 3: TYPESCRIPT (The Shield)
*Goal: Enforce types and structure.*

### 11. TypeScript Fundamentals
- **Basic Types**: `string`, `number`, `boolean`, `unknown`, `void`.
- **Inference**: Letting TS detect types automatically.

### 12. Type vs Interface
- **Interface**: For Object contracts and Classes (Extensible).
- **Type**: For Unions, Primitives, Tuples, and Functions.

### 13. Generics
- Writing reusable components with type parameters (`<T>`).


## PHASE 4: NODE.JS SYSTEM (The Runtime)
*Goal: Master Server-side I/O without Frameworks.*

### 14. Module System
- **CommonJS**: `require`, `module.exports` (Legacy/Standard).
- **ES Modules**: `import`, `export` (Modern).
- **Globals**: `process`, `__dirname`, `__filename`.

### 15. Event Emitter
- **Pattern**: Pub/Sub (Publish/Subscribe).
- **Implementation**: `EventEmitter` class (`on`, `emit`).

### 16. File System & Path
- **fs Module**: Sync vs Async file operations.
- **path Module**: Cross-platform path resolution (`path.join`).

### 17. Raw Web Server
- **http Module**: Creating a server instance.
- **Request/Response**: Parsing headers, methods, and sending JSON bodies manually.