import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';

@Module({
  providers: [VendaService],
  controllers: [VendaController]
})
export class VendaModule {}
