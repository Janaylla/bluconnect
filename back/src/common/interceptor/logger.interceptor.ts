import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';
import { tap, catchError } from 'rxjs/operators';
import { HTTPMethod } from '@prisma/client';
import { pathToModel } from './logger.constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Presume que o usuário já foi autenticado
    const userId = user ? user.id : null;
    request.url = request.url.split('?')[0];
    const modelKey = request.url.split('/')[1];
    console.log(modelKey);
    const model = pathToModel[modelKey];
    // Cria o log inicial sem o status de sucesso
    const log = await this.prisma.log.create({
      data: {
        action: `Request to ${request.url}`,
        method: request.method as HTTPMethod,
        body: JSON.stringify(request.body) || null,
        query: JSON.stringify(request.query) || null,
        params: JSON.stringify(request.params) || null,
        url: request.url,
        model,
        userId: userId,
        success: null,
        loading: true,
      },
    });

    return next.handle().pipe(
      tap(async () => {
        await this.prisma.log.update({
          where: { id: log.id },
          data: { success: true, loading: false },
        });
      }),
      catchError(async () => {
        await this.prisma.log.update({
          where: { id: log.id },
          data: { success: true, loading: false },
        });
      }),
    );
  }
}
