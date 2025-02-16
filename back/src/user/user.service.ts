import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUser, UserDto, UserSearchDTO } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: UserDto) {
    await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name, // Incluindo o nome
        password: await this.hashPassword(createUserDto.password),
        active: createUserDto.active ?? true, // Definindo 'active' como true por padrão
      },
    });
  }
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException('Erro ao buscar usuário');
    }
  }
  async findById(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { id, active: true } });
  }
  async inactiveUser(requesterId: number, id: number) {
    if (requesterId === id) {
      throw new Error('Você não pode inativar a si mesmo.');
    }
    await this.prisma.user.update({
      where: { id: +id },
      data: {
        active: false,
      },
    });
  }
  async updateUser(requesterId: number, id: number, data: UpdateUser) {
    if (requesterId === id) {
      throw new Error('Você não pode editar a si mesmo.');
    }
    await this.prisma.user.update({
      where: { id: +id },
      data,
    });
  }
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async listUsers(
    requesterId: number,
    { asc, limit, order, page }: UserSearchDTO,
  ) {
    const rows = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
      },
      where: {
        active: true,
        id: {
          not: +requesterId,
        },
      },
      orderBy: {
        [order]: asc,
      },
      take: +limit,
      skip: (page - 1) * +limit,
    });
    const count = await this.prisma.log.count();
    return { rows, count };
  }
}
