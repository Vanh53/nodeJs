import 'reflect-metadata';
import { Body, Controller, Get, Injectable, Module, Param, Post } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

type User = {
  id: string;
  email: string;
};

type CreateUserDto = {
  email: string;
};

@Injectable()
class UsersService {
  private readonly users: User[] = [];

  create(input: CreateUserDto): User {
    const user = { id: crypto.randomUUID(), email: input.email };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto): User {
    return this.usersService.create(body);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(id);
  }
}

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
class AppModule {}

async function runSelfTest(baseUrl: string): Promise<void> {
  const created = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'lan@example.com' }),
  });
  console.log(await created.json());

  const list = await fetch(`${baseUrl}/users`);
  console.log(await list.json());
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(process.env.EXAMPLE_ONCE ? 0 : 3004);

  const baseUrl = await app.getUrl();
  console.log(`Nest core server listening at ${baseUrl}`);

  if (process.env.EXAMPLE_ONCE) {
    await runSelfTest(baseUrl);
    await app.close();
  }
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
