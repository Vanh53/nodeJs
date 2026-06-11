import http from 'node:http';

type User = {
  id: string;
  email: string;
};

const users: User[] = [];

function sendJson(response: http.ServerResponse, statusCode: number, body: unknown): void {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request: http.IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

    if (request.method === 'GET' && url.pathname === '/users') {
      sendJson(response, 200, { data: users });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/users') {
      const body = (await readJsonBody(request)) as Partial<User>;

      if (typeof body.email !== 'string' || !body.email.includes('@')) {
        sendJson(response, 400, { error: 'email is required' });
        return;
      }

      const user = { id: crypto.randomUUID(), email: body.email };
      users.push(user);
      sendJson(response, 201, { data: user });
      return;
    }

    sendJson(response, 404, { error: 'not found' });
  } catch (error) {
    sendJson(response, 500, { error: error instanceof Error ? error.message : 'unknown error' });
  }
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

server.listen(process.env.EXAMPLE_ONCE ? 0 : 3001, async () => {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 3001;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Raw Node HTTP server listening at ${baseUrl}`);

  if (process.env.EXAMPLE_ONCE) {
    await runSelfTest(baseUrl);
    server.close();
  }
});
