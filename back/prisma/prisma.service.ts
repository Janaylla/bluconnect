import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // Conecta ao banco de dados assim que o módulo é iniciado
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta do banco quando o módulo é destruído
  }
}
