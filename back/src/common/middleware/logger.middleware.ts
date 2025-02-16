import { Injectable, NestMiddleware } from '@nestjs/common';
import { HTTPMethod } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    if (req.method === 'GET' || !userId) {
      return next();
    }

    // Cria o log inicial sem o status de sucesso
    const logEntry = await this.prisma.log.create({
      data: {
        action: `Request to ${req.url}`,
        method: req.method as HTTPMethod,
        body: JSON.stringify(req.body) || null,
        query: JSON.stringify(req.query) || null,
        params: JSON.stringify(req.params) || null,
        url: req.url,
        model: 'Unknown', // Substitua se necessário
        userId: userId || null,
        success: false, // Por padrão, inicia com `false`
        loading: false,
      },
    });

    // Escuta o evento `finish` para capturar o status da resposta
    res.on('finish', async () => {
      const success = res.statusCode >= 200 && res.statusCode < 400;
      await this.prisma.log.update({
        where: { id: logEntry.id },
        data: { success },
      });
    });

    next();
  }
}
