import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

async function main(): Promise<void> {
  const tempDir = path.join(process.cwd(), '.tmp', 'node-streams');
  const inputFile = path.join(tempDir, 'input.txt');
  const outputFile = path.join(tempDir, 'output.txt');

  await mkdir(tempDir, { recursive: true });
  await writeFile(inputFile, 'node\nexpress\nnestjs\n', 'utf8');

  const upperCaseTransform = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      callback(null, chunk.toString('utf8').toUpperCase());
    },
  });

  await pipeline(createReadStream(inputFile), upperCaseTransform, createWriteStream(outputFile));

  console.log(await readFile(outputFile, 'utf8'));
  await rm(tempDir, { recursive: true, force: true });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
