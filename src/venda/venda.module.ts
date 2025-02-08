import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { Venda } from './venda.entity';
import { Produto } from '../produto/produto.entity'; // Certifique-se de importar o Produto
import { ProdutoService } from '../produto/produto.service'; // Caso precise usar o serviço de Produto

@Module({
  imports: [TypeOrmModule.forFeature([Venda, Produto])],  // Aqui estamos registrando o repositório de Venda
  providers: [VendaService],
  controllers: [VendaController],
})
export class VendaModule {}
