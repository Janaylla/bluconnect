import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { LogSearchDTO } from './log.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';

@Controller('log')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async listLogs(@Query() query: LogSearchDTO) {
    return this.logService.listLogs(query);
  }
}
