import 'reflect-metadata';
import {
  ArgumentsHost,
  BadRequestException,
  Body,
  CallHandler,
  CanActivate,
  Catch,
  Controller,
  createParamDecorator,
  ExecutionContext,
  ExceptionFilter,
  Get,
  HttpException,
  Injectable,
  Module,
  NestInterceptor,
  NestMiddleware,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { memoryStorage } from 'multer';
import { Observable, map } from 'rxjs';

type User = {
  id: number;
  email: string;
  displayName: string;
};

type RequestLike = {
  method: string;
  originalUrl: string;
  path: string;
  headers: Record<string, string | string[] | undefined>;
  user?: { id: number; email: string };
};

class CreateUserDto {
  @IsEmail()
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email!: string;

  @IsString()
  @MinLength(2)
  displayName!: string;
}

@Injectable()
class UsersService {
  private readonly users: User[] = [];
  private nextId = 1;

  create(input: CreateUserDto): User {
    const user = { id: this.nextId, email: input.email, displayName: input.displayName };
    this.nextId += 1;
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new BadRequestException(`User ${id} does not exist`);
    }

    return user;
  }
}

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  use(request: RequestLike, _response: unknown, next: () => void): void {
    console.log(`[request] ${request.method} ${request.originalUrl}`);
    next();
  }
}

@Injectable()
class ResponseEnvelopeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestLike>();

    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          path: request.path,
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}

@Catch(HttpException)
class HttpExceptionEnvelopeFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<{ status(code: number): { json(body: unknown): void } }>();
    const request = context.getRequest<RequestLike>();
    const status = exception.getStatus();

    response.status(status).json({
      error: exception.message,
      meta: {
        status,
        path: request.path,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

@Injectable()
class DemoAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestLike>();

    if (request.headers.authorization !== 'Bearer demo-token') {
      throw new BadRequestException('Missing demo token');
    }

    request.user = { id: 1, email: 'demo@example.com' };
    return true;
  }
}

const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest<RequestLike>().user;
});

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto): User {
    return this.usersService.create(body);
  }

  @Get()
  @UseGuards(DemoAuthGuard)
  findAll(@CurrentUser() currentUser: { id: number; email: string }): { currentUser: { id: number; email: string }; users: User[] } {
    return {
      currentUser,
      users: this.usersService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (file.mimetype !== 'image/jpeg') {
          callback(new BadRequestException('Only jpeg avatars are allowed'), false);
          return;
        }

        callback(null, true);
      },
    }),
  )
  uploadAvatar(@UploadedFile() file?: Express.Multer.File): { filename?: string; size?: number } {
    return {
      filename: file?.originalname,
      size: file?.size,
    };
  }
}

@Module({
  controllers: [UsersController],
  providers: [UsersService, DemoAuthGuard],
})
class AppModule {
  configure(consumer: { apply(middleware: typeof LoggerMiddleware): { forRoutes(route: string): void } }): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

async function runSelfTest(baseUrl: string): Promise<void> {
  await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'LAN@EXAMPLE.COM', displayName: 'Lan' }),
  });

  const list = await fetch(`${baseUrl}/users`, {
    headers: { authorization: 'Bearer demo-token' },
  });
  console.log(await list.json());

  const invalid = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'invalid', displayName: 'A' }),
  });
  console.log(await invalid.json());

  const form = new FormData();
  form.append('avatar', new Blob(['fake jpeg bytes'], { type: 'image/jpeg' }), 'avatar.jpg');

  const upload = await fetch(`${baseUrl}/users/avatar`, {
    method: 'POST',
    body: form,
  });
  console.log(await upload.json());
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ResponseEnvelopeInterceptor());
  app.useGlobalFilters(new HttpExceptionEnvelopeFilter());

  await app.listen(process.env.EXAMPLE_ONCE ? 0 : 3005);

  const baseUrl = await app.getUrl();
  console.log(`Nest advanced server listening at ${baseUrl}`);

  if (process.env.EXAMPLE_ONCE) {
    await runSelfTest(baseUrl);
    await app.close();
  }
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
