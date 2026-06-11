type User = {
  id: string;
  email: string;
  passwordHash: string;
  displayName?: string;
  createdAt: Date;
};

type PublicUser = Omit<User, 'passwordHash'>;
type CreateUserInput = Pick<User, 'email' | 'passwordHash'> & Partial<Pick<User, 'displayName'>>;
type UserPatch = Partial<Pick<User, 'email' | 'displayName'>>;
type UserPermissions = Record<string, 'read' | 'write' | 'admin'>;

function toPublicUser(user: User): Readonly<PublicUser> {
  const { passwordHash, ...publicUser } = user;
  return Object.freeze(publicUser);
}

function createUser(input: CreateUserInput): User {
  return {
    id: crypto.randomUUID(),
    email: input.email,
    passwordHash: input.passwordHash,
    displayName: input.displayName,
    createdAt: new Date(),
  };
}

const user = createUser({ email: 'lan@example.com', passwordHash: 'hash' });
const patch: UserPatch = { displayName: 'Lan' };
const permissions: UserPermissions = { users: 'admin', reports: 'read' };

console.log(toPublicUser({ ...user, ...patch }));
console.log(permissions);
