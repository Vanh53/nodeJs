import express, { Request, Response } from 'express';

type User = {
  id: string;
  email: string;
};

const app = express();
const users: User[] = [];

app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.json({ status: 'ok' });
});

app.get('/users', (_request: Request, response: Response) => {
  response.json({ data: users });
});

app.post('/users', (request: Request, response: Response) => {
  const body = request.body as Partial<User>;

  if (typeof body.email !== 'string' || !body.email.includes('@')) {
    response.status(400).json({ error: 'email is required' });
    return;
  }

  const user = { id: crypto.randomUUID(), email: body.email };
  users.push(user);
  response.status(201).json({ data: user });
});

async function runSelfTest(baseUrl: string): Promise<void> {
  await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'lan@example.com' }),
  });

  const response = await fetch(`${baseUrl}/users`);
  console.log(await response.json());
}

const server = app.listen(process.env.EXAMPLE_ONCE ? 0 : 3002, async () => {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 3002;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Express core server listening at ${baseUrl}`);

  if (process.env.EXAMPLE_ONCE) {
    await runSelfTest(baseUrl);
    server.close();
  }
});
