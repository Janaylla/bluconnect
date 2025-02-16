import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LogSearchDTO } from './log.dto';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async listLogs({ asc, limit, order, page }: LogSearchDTO) {
    const rows = await this.prisma.log.findMany({
      select: {
        action: true,
        id: true,
        method: true,
        success: true,
        url: true,
        model: true,
        timestamp: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      where: {
        loading: false,
      },
      orderBy: {
        [order]: asc,
      },
      take: +limit,
      skip: (page - 1) * +limit,
    });
    const count = await this.prisma.log.count();
    return { rows, count };
  }
}
