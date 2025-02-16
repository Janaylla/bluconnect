import { Injectable } from '@nestjs/common';
import {
  BusRouteDTO,
  RouteSearchDTO,
  RoutesFromCoordinateshDTO,
} from './busRoute.dto';
import { PrismaService } from 'prisma/prisma.service';
import { BusRoute } from '@prisma/client';

@Injectable()
export class BusRouteService {
  constructor(private prisma: PrismaService) {}

  async createBusRoute(data: BusRouteDTO) {
    return await this.prisma.busRoute.create({ data });
  }

  // Encontrar a parada mais próxima do ponto de um ponto
  private async findNearestStop(latitude: number, longitude: number) {
    const nearestToStop: {
      id: number;
      latitude: number;
      longitude: number;
      name: string;
    }[] = await this.prisma.$queryRawUnsafe(`
      SELECT id, latitude, longitude, name,
             (6371 * ACOS(COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${longitude})) + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) AS distance
      FROM "BusStop"
      ORDER BY distance ASC
      LIMIT 1;
    `);
    return nearestToStop[0];
  }

  async listRoutesFromCoordinates({
    from_latitude,
    from_longitude,
    to_latitude,
    to_longitude,
  }: RoutesFromCoordinateshDTO): Promise<BusRoute[]> {
    // Passo 1: Encontrar a parada mais próxima do ponto de origem (from)
    const nearestFromStop = await this.findNearestStop(
      from_latitude,
      from_longitude,
    );
    const nearestToStop = await this.findNearestStop(to_latitude, to_longitude);

    if (!nearestFromStop || !nearestToStop) {
      return []; // Retorna vazio se não encontrar paradas próximas
    }
    return await this.listRoutesPossibleRoutes({
      from_id: nearestFromStop.id,
      to_id: nearestToStop.id,
    });
  }
  async listRoutesPossibleRoutes(query: RouteSearchDTO): Promise<BusRoute[]> {
    const { from_id, to_id } = query;

    const toPossibily = await this.prisma.busRoute.findMany({
      where: { busStopId: +from_id },
    });

    const from = await this.prisma.busRoute.findFirst({
      where: {
        OR: toPossibily.map((b) => ({
          tripId: b.tripId,
          busStop: {
            id: +to_id,
          },
          index: {
            gt: b.index,
          },
        })),
      },
    });
    if (!from) return [];
    const to = await this.prisma.busRoute.findFirst({
      where: {
        tripId: from.tripId,
        busStopId: +from_id,
      },
    });
    if (!to) return [];
    const max = to.index > from.index ? to.index : from.index;
    const min = to.index < from.index ? to.index : from.index;
    // Consulta as rotas com base nas paradas de ônibus de origem e destino
    const routes = await this.prisma.busRoute.findMany({
      where: {
        index: {
          gte: min,
          lte: max,
        },
        tripId: to.tripId,
      },
      orderBy: {
        index: 'asc', // Ordena as rotas pelo índice
      },
      include: {
        busStop: true,
      },
    });
    return routes;
  }
  async getBusRoute(id: number) {
    return await this.prisma.busRoute.findUnique({ where: { id } });
  }

  async updateBusRoute(id: number, data: BusRouteDTO) {
    return await this.prisma.busRoute.update({ where: { id }, data });
  }

  async deleteBusRoute(id: number) {
    return await this.prisma.busRoute.delete({ where: { id } });
  }
}
