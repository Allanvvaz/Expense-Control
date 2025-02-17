import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma/prisma.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [PessoaModule,PrismaModule,TransacaoModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
