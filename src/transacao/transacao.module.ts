import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaModule } from 'prisma/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TransacaoService],
  controllers: [TransacaoController]
})
export class TransacaoModule {}
