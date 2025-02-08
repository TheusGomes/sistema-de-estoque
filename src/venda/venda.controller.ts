import { Controller, Post, Body } from '@nestjs/common';
import { VendaService } from './venda.service';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  async criarVenda(@Body() body: { user: any; itens: { produtoId: number; quantidade: number }[] }) {
    return this.vendaService.criarVenda(body.user, body.itens);
  }
}
