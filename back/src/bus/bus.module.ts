import { Module } from '@nestjs/common';
import { TripController } from './trip/trip.controller';
import { BusStopController } from './busStop/busStop.controller';
import { BusRouteController } from './busRoute/busRoute.controller';
import { TripService } from './trip/trip.service';
import { BusStopService } from './busStop/busStop.service';
import { BusRouteService } from './busRoute/busRoute.service';
import { PrismaService } from 'prisma/prisma.service';
import { TravelScheduleController } from './travelSchedule/travelSchedule.controller';
import { TravelScheduleService } from './travelSchedule/travelSchedule.service';
@Module({
  imports: [],
  controllers: [TripController, BusStopController, BusRouteController, TravelScheduleController],
  providers: [TripService, BusStopService, BusRouteService, PrismaService, TravelScheduleService],
  exports: [TripService, BusStopService, BusRouteService, PrismaService, TravelScheduleService],
})
export class BusModule { }
