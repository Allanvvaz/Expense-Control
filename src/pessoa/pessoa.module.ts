// Código para organizar e gerenciar a estrutura pessoa do backend
import { Module } from '@nestjs/common'
import { PessoaService } from './pessoa.service'
import { PessoaController } from './pessoa.controller'
import { PrismaModule } from 'prisma/prisma/prisma.module'

@Module({
  imports : [PrismaModule],
  providers: [PessoaService],
  controllers: [PessoaController]
})
export class PessoaModule {}
