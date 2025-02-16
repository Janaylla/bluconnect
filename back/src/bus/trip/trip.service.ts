import { Injectable } from '@nestjs/common';
import { BusRouteCreateDTO, TripCreateDTO, TripSearchDTO } from './trip.dto';
import { PrismaService } from 'prisma/prisma.service';
import { BusRouteDTO } from '../busRoute/busRoute.dto';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) { }
  private getTripDetails(routes: BusRouteCreateDTO[]) {
    const averageTime = routes.reduce((a, b) => a + b.averageTimePlus, 0)
    const routesSort = routes.sort((a, b) => a.index - b.index);
    const startBusStopId = routesSort[0].busStopId
    const endBusStopId = routesSort[routesSort.length - 1].busStopId
    return {
      averageTime,
      startBusStopId,
      endBusStopId,
      numberStops: routes.length
    }
  }
  async createTrip(data: TripCreateDTO) {
    const { code, routes } = data;
    const { averageTime, endBusStopId, startBusStopId, numberStops } = this.getTripDetails(routes)
    const trip = await this.prisma.trip.create({
      data: {
        code,
        averageTime,
        numberStops,
        startBusStop: {
          connect: {
            id: startBusStopId,
          }
        },
        endBusStop: {
          connect: {
            id: endBusStopId,
          },
        },
      },
    });
    await this.createBusRoute(trip.id, routes);
  }
  private async createBusRoute(tripId: number, routes: BusRouteCreateDTO[]) {
    const tripRoutes: BusRouteDTO[] = routes.map((route) => {
      return {
        tripId: tripId,
        busStopId: route.busStopId,
        index: route.index,
        averageTimePlus: route.averageTimePlus
      };
    });
    await this.prisma.busRoute.createMany({
      data: tripRoutes,
    });
  }

  async listTrips({
    limit, page, search,
    asc, code, order,
    "startBusStop.name": startName, "endBusStop.name": endName,
    numberStops_from, numberStops_to,
  }: TripSearchDTO) {
    const pageSize = limit;

    const orders = order.split('.');
    const orderBy = {};
    let currentLevel = orderBy;

    for (let i = 0; i < orders.length; i++) {
      const key = orders[i];
      if (i === orders.length - 1) {
        currentLevel[key] = asc;
      } else {
        currentLevel[key] = {};
        currentLevel = currentLevel[key];
      }
    }

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.trip.findMany({
      orderBy: order ? orderBy : {
        code: 'asc'
      },
      where: {
        code: {
          contains: search,
          mode: 'insensitive',
        },
        ...(code ? {
          code: {
            contains: code,
            mode: 'insensitive',
          }
        } : null),
        ...(startName ? {
          startBusStop: {
            name: {
              contains: startName,
              mode: 'insensitive',
            },
          }
        } : null),
        ...(endName ? {
          endBusStop: {
            name: {
              contains: endName,
              mode: 'insensitive',
            }
          }
        } : null),
        numberStops: {
          gte: +numberStops_from || -99999999,
          lte: +numberStops_to || 99999999,
        },
      },
      include: {
        startBusStop: true,
        endBusStop: true,
      },
      take: +pageSize,
      skip,
    });
    const count = await this.prisma.trip.count({
      where: {
        code: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return { rows, count };
  }

  async getTrip(id: number) {
    return await this.prisma.trip.findUnique({
      where: { id },
      include: {
        busRoutes: {
          include: {
            busStop: true,
          },
          orderBy: {
            index: 'asc'
          }
        },
      },
    });
  }

  async updateTrip(id: number, data: TripCreateDTO) {
    const { code, routes } = data;
    const { averageTime, endBusStopId, startBusStopId, numberStops } = this.getTripDetails(routes)
    await this.prisma.trip.update({
      where: { id },
      data: { code, averageTime, endBusStopId, startBusStopId, numberStops }
    });
    await this.prisma.busRoute.deleteMany({ where: { tripId: id } });
    await this.createBusRoute(id, data.routes);
  }

  async deleteTrip(id: number) {
    return await this.prisma.trip.delete({ where: { id } });
  }
}
