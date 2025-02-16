import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LogController } from './log.controller';

@Module({
  imports: [PrismaModule],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}
