import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function main(): Promise<void> {
  const { stdout } = await execFileAsync(process.execPath, [
    '-e',
    'console.log(JSON.stringify({ pid: process.pid, message: "hello from child" }))',
  ]);

  console.log(JSON.parse(stdout) as { pid: number; message: string });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
