type Entity = {
  id: string;
};

class InMemoryRepository<T extends Entity> {
  private readonly items = new Map<string, T>();

  create(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findMany(predicate: (item: T) => boolean): T[] {
    return [...this.items.values()].filter(predicate);
  }
}

type User = Entity & {
  email: string;
  isActive: boolean;
};

const users = new InMemoryRepository<User>();
users.create({ id: 'u1', email: 'lan@example.com', isActive: true });
users.create({ id: 'u2', email: 'minh@example.com', isActive: false });

console.log('active users:', users.findMany((user) => user.isActive));
