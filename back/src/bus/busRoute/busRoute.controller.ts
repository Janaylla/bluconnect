import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BusRouteService } from './busRoute.service';
import {
  BusRouteDTO,
  RouteSearchDTO,
  RoutesFromCoordinateshDTO,
} from './busRoute.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';

@Controller('bus-routes')
export class BusRouteController {
  constructor(private busRouteService: BusRouteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  createBusRoute(@Body() busRouteDTO: BusRouteDTO) {
    return this.busRouteService.createBusRoute(busRouteDTO);
  }

  @Get('possible-routes')
  listBusRoutes(@Query() query: RouteSearchDTO) {
    return this.busRouteService.listRoutesPossibleRoutes(query);
  }

  @Get('from-coordinates')
  listRoutesFromCoordinates(@Query() query: RoutesFromCoordinateshDTO) {
    return this.busRouteService.listRoutesFromCoordinates(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  getBusRoute(@Param('id') id: string) {
    return this.busRouteService.getBusRoute(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  updateBusRoute(@Param('id') id: string, @Body() busRouteDTO: BusRouteDTO) {
    return this.busRouteService.updateBusRoute(Number(id), busRouteDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  deleteBusRoute(@Param('id') id: string) {
    return this.busRouteService.deleteBusRoute(Number(id));
  }
}
