import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LogSearchDTO } from './log.dto';
import { buildOrderByObject } from 'src/common/function';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async listLogs({ asc, limit, order, page }: LogSearchDTO) {
    const orderBy = buildOrderByObject(order, asc);
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
        NOT: {
          method: 'GET',
        },
      },
      orderBy: order
        ? orderBy
        : {
            [order]: asc,
          },
      take: +limit,
      skip: (page - 1) * +limit,
    });
    const count = await this.prisma.log.count({
      where: {
        NOT: {
          method: 'GET',
        },
      },
    });
    return { rows, count };
  }
}
