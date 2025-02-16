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
import { TripService } from './trip.service';
import { TripCreateDTO, TripSearchDTO } from './trip.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';

@Controller('trips')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class TripController {
  constructor(private tripService: TripService) {}

  @Post()
  async createTrip(@Body() tripDTO: TripCreateDTO) {
    return this.tripService.createTrip(tripDTO);
  }

  @Get()
  async listTrips(@Query() query: TripSearchDTO) {
    return this.tripService.listTrips(query);
  }

  @Get(':id')
  async getTrip(@Param('id') id: string) {
    return this.tripService.getTrip(Number(id));
  }

  @Put(':id')
  async updateTrip(@Param('id') id: string, @Body() tripDTO: TripCreateDTO) {
    return this.tripService.updateTrip(Number(id), tripDTO);
  }

  @Delete(':id')
  async deleteTrip(@Param('id') id: string) {
    return this.tripService.deleteTrip(Number(id));
  }
}
