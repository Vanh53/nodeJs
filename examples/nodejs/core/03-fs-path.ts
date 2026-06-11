import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function main(): Promise<void> {
  const tempDir = path.join(process.cwd(), '.tmp', 'node-fs');
  const filePath = path.join(tempDir, 'users.json');
  const users = [{ id: 'u1', email: 'lan@example.com' }];

  await mkdir(tempDir, { recursive: true });
  await writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

  const raw = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as typeof users;

  console.log('file path:', filePath);
  console.log('parsed users:', parsed);

  await rm(tempDir, { recursive: true, force: true });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
