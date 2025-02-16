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
import {
  TravelScheduleDTO,
  TravelScheduleSearchDTO,
} from './travelSchedule.dto';
import { TravelScheduleService } from './travelSchedule.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';

@Controller('travel-schedule')
export class TravelScheduleController {
  constructor(private travelScheduleService: TravelScheduleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async createTravelSchedule(@Body() travelScheduleDTO: TravelScheduleDTO) {
    return this.travelScheduleService.createTravelSchedule(travelScheduleDTO);
  }

  @Get()
  async listTravelSchedules(@Query() query: TravelScheduleSearchDTO) {
    return this.travelScheduleService.listTravelSchedules(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async getTravelSchedule(@Param('id') id: string) {
    return this.travelScheduleService.getTravelSchedule(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async updateTravelSchedule(
    @Param('id') id: string,
    @Body() travelScheduleDTO: TravelScheduleDTO,
  ) {
    return this.travelScheduleService.updateTravelSchedule(
      Number(id),
      travelScheduleDTO,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async deleteTravelSchedule(@Param('id') id: string) {
    return this.travelScheduleService.deleteTravelSchedule(Number(id));
  }
}
