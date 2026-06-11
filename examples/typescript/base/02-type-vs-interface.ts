interface User {
  id: string;
}

interface User {
  email: string;
}

interface Repository<T> {
  findById(id: string): T | undefined;
}

type UserRole = 'reader' | 'admin';
type CreateUserInput = {
  email: string;
  roles: UserRole[];
};
type CreateUserHandler = (input: CreateUserInput) => User;

class InMemoryUserRepository implements Repository<User> {
  private readonly users = new Map<string, User>();

  save(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }
}

const createUser: CreateUserHandler = (input) => ({
  id: crypto.randomUUID(),
  email: input.email,
});

const repository = new InMemoryUserRepository();
const user = repository.save(createUser({ email: 'lan@example.com', roles: ['admin'] }));

console.log(repository.findById(user.id));
