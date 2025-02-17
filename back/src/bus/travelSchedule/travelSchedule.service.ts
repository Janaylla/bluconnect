import { Injectable } from '@nestjs/common';
import {
  TravelScheduleDTO,
  TravelScheduleSearchDTO,
} from './travelSchedule.dto';
import { PrismaService } from 'prisma/prisma.service';
import { buildOrderByObject } from 'src/common/function';

@Injectable()
export class TravelScheduleService {
  constructor(private prisma: PrismaService) {}

  async createTravelSchedule(data: TravelScheduleDTO) {
    return await this.prisma.travelSchedule.create({ data });
  }

  async listTravelSchedules({
    limit,
    page,
    time_from,
    time_to,
    asc,
    'trip.code': trip_code,
    order,
    friday,
    monday,
    saturday,
    sunday,
    thursday,
    tuesday,
    wednesday,
  }: TravelScheduleSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;

    const orderBy = buildOrderByObject(order, asc);
    const rows = await this.prisma.travelSchedule.findMany({
      orderBy,
      take: +pageSize,
      skip,
      include: {
        trip: {},
      },
      where: {
        ...(friday === 'true' ? { friday: true } : null),
        ...(monday === 'true' ? { monday: true } : null),
        ...(saturday === 'true' ? { saturday: true } : null),
        ...(sunday === 'true' ? { sunday: true } : null),
        ...(thursday === 'true' ? { thursday: true } : null),
        ...(tuesday === 'true' ? { tuesday: true } : null),
        ...(wednesday === 'true' ? { wednesday: true } : null),
        time: {
          gte: +time_from || 0,
          lte: +time_to || 99999999,
        },
        ...(trip_code
          ? {
              trip: {
                code: {
                  contains: trip_code,
                  mode: 'insensitive',
                },
              },
            }
          : null),
      },
    });
    const count = await this.prisma.travelSchedule.count();
    return { rows, count };
  }

  async getTravelSchedule(id: number) {
    return await this.prisma.travelSchedule.findUnique({ where: { id } });
  }

  async updateTravelSchedule(id: number, data: TravelScheduleDTO) {
    return await this.prisma.travelSchedule.update({ where: { id }, data });
  }

  async deleteTravelSchedule(id: number) {
    return await this.prisma.travelSchedule.delete({ where: { id } });
  }
}
