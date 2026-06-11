import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

type User = {
  id: string;
  email: string;
  displayName: string;
};

type RequestWithUser = Request & {
  user?: { id: string; role: 'demo' };
  requestId?: string;
};

class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

const app = express();
const users: User[] = [];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    if (file.mimetype !== 'image/jpeg') {
      callback(new AppError(400, 'Only jpeg avatars are allowed'));
      return;
    }

    callback(null, true);
  },
});

function requestContext(request: RequestWithUser, response: Response, next: NextFunction): void {
  request.requestId = crypto.randomUUID();
  response.setHeader('x-request-id', request.requestId);
  next();
}

function requireDemoToken(request: RequestWithUser, _response: Response, next: NextFunction): void {
  if (request.headers.authorization !== 'Bearer demo-token') {
    next(new AppError(401, 'Missing or invalid token'));
    return;
  }

  request.user = { id: 'demo-user', role: 'demo' };
  next();
}

function asyncHandler(
  handler: (request: RequestWithUser, response: Response, next: NextFunction) => Promise<void>,
) {
  return (request: RequestWithUser, response: Response, next: NextFunction) => {
    handler(request, response, next).catch(next);
  };
}

function validateCreateUser(body: unknown): { email: string; displayName: string } {
  if (!body || typeof body !== 'object') {
    throw new AppError(400, 'Body must be an object');
  }

  const candidate = body as { email?: unknown; displayName?: unknown };

  if (typeof candidate.email !== 'string' || !candidate.email.includes('@')) {
    throw new AppError(400, 'email must be valid');
  }

  if (typeof candidate.displayName !== 'string' || candidate.displayName.length < 2) {
    throw new AppError(400, 'displayName must have at least 2 characters');
  }

  return { email: candidate.email, displayName: candidate.displayName };
}

app.use(express.json());
app.use(requestContext);

app.get('/users', requireDemoToken, (request: RequestWithUser, response: Response) => {
  response.json({ data: users, meta: { requestId: request.requestId, currentUser: request.user } });
});

app.post(
  '/users',
  asyncHandler(async (request, response) => {
    const input = validateCreateUser(request.body);
    const user = { id: crypto.randomUUID(), ...input };
    users.push(user);
    response.status(201).json({ data: user, meta: { requestId: request.requestId } });
  }),
);

app.post('/avatars', upload.single('avatar'), (request: Request, response: Response) => {
  response.status(201).json({
    data: {
      filename: request.file?.originalname,
      size: request.file?.size,
    },
  });
});

app.use((error: unknown, request: RequestWithUser, response: Response, _next: NextFunction) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : 'Internal server error';

  response.status(statusCode).json({
    error: message,
    meta: {
      requestId: request.requestId,
      path: request.path,
      timestamp: new Date().toISOString(),
    },
  });
});

async function runSelfTest(baseUrl: string): Promise<void> {
  await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'lan@example.com', displayName: 'Lan' }),
  });

  const protectedResponse = await fetch(`${baseUrl}/users`, {
    headers: { authorization: 'Bearer demo-token' },
  });
  console.log(await protectedResponse.json());

  const form = new FormData();
  form.append('avatar', new Blob(['fake jpeg bytes'], { type: 'image/jpeg' }), 'avatar.jpg');

  const uploadResponse = await fetch(`${baseUrl}/avatars`, {
    method: 'POST',
    body: form,
  });
  console.log(await uploadResponse.json());
}

const server = app.listen(process.env.EXAMPLE_ONCE ? 0 : 3003, async () => {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 3003;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Express advanced server listening at ${baseUrl}`);

  if (process.env.EXAMPLE_ONCE) {
    await runSelfTest(baseUrl);
    server.close();
  }
});
