import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtoService.findOne(id);
  }

  @Post()
  create(@Body() produto: Produto) {
    return this.produtoService.create(produto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() produto: Produto) {
    return this.produtoService.update(id, produto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.produtoService.delete(id);
  }
}
