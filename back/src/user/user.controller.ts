import {
  Controller,
  Put,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser, UserSearchDTO } from './user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async createUser(@Body() createUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async inactiveUser(@Param('id') id: number, @Request() req) {
    const requesterId = req.user.id; // Supondo que o ID do usuário autenticado esteja em req.user
    return this.userService.inactiveUser(requesterId, id);
  }

  @Put(':id')
  @UseInterceptors(LoggingInterceptor)
  async updateUser(
    @Param('id') id: number,
    @Body() data: UpdateUser,
    @Request() req,
  ) {
    const requesterId = req.user.id;
    return this.userService.updateUser(requesterId, id, data);
  }

  @Get()
  async listUsers(@Query() query: UserSearchDTO, @Request() req) {
    const requesterId = req.user.id;
    return this.userService.listUsers(requesterId, query);
  }
}
