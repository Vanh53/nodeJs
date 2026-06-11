type UserStatus = 'active' | 'disabled';

const userId: number = 1;
const email: string = 'lan@example.com';
const isAdmin: boolean = false;
const roles: string[] = ['reader', 'editor'];
const responseTuple: [number, string] = [200, 'OK'];
const status: UserStatus = 'active';

function normalizeUnknown(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return 'unsupported';
}

function logUser(): void {
  console.log({ userId, email, isAdmin, roles, responseTuple, status });
}

logUser();
console.log('unknown string:', normalizeUnknown('  NESTJS  '));
console.log('unknown number:', normalizeUnknown(42));
