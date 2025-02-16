import { Injectable } from '@nestjs/common';
import { BusStopDTO, BusStopSearchDTO } from './busStop.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BusStopService {
  constructor(private prisma: PrismaService) {}

  async createBusStop(data: BusStopDTO) {
    console.log(data);
    return await this.prisma.busStop.create({ data });
  }

  async listBusStops({
    limit,
    page,
    search,
    asc,
    name,
    order,
    latitude_from,
    longitude_from,
    latitude_to,
    longitude_to,
  }: BusStopSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.busStop.findMany({
      orderBy: {
        ...(order
          ? {
              [order]: asc,
            }
          : {
              name: 'asc',
            }),
      },
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        longitude: {
          gte: +longitude_from || -99999999,
          lte: +longitude_to || 99999999,
        },
        latitude: {
          gte: +latitude_from || -99999999,
          lte: +latitude_to || 99999999,
        },
        ...(name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : null),
      },
      take: +pageSize,
      skip,
    });
    const count = await this.prisma.busStop.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return { rows, count };
  }

  async getBusStop(id: number) {
    return await this.prisma.busStop.findUnique({ where: { id } });
  }

  async updateBusStop(id: number, data: BusStopDTO) {
    return await this.prisma.busStop.update({ where: { id }, data });
  }

  async deleteBusStop(id: number) {
    return await this.prisma.busStop.delete({ where: { id } });
  }
}
