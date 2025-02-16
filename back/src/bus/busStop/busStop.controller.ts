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
import { BusStopService } from './busStop.service';
import { BusStopDTO, BusStopSearchDTO } from './busStop.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';

@Controller('bus-stops')
export class BusStopController {
  constructor(private busStopService: BusStopService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async createBusStop(@Body() busStopDTO: BusStopDTO) {
    return this.busStopService.createBusStop(busStopDTO);
  }

  @Get()
  async listBusStops(@Query() query: BusStopSearchDTO) {
    return this.busStopService.listBusStops(query);
  }

  @Get(':id')
  async getBusStop(@Param('id') id: string) {
    return this.busStopService.getBusStop(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async updateBusStop(@Param('id') id: string, @Body() busStopDTO: BusStopDTO) {
    return this.busStopService.updateBusStop(Number(id), busStopDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async deleteBusStop(@Param('id') id: string) {
    return this.busStopService.deleteBusStop(Number(id));
  }
}
