import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { Produto } from '../produto/produto.entity';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  // Método de criação da venda
  async criarVenda(user: any, itens: { produtoId: number; quantidade: number }[]) {
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    let totalVenda = 0;

    for (const item of itens) {
      const produto = await this.findProdutoById(item.produtoId);
      if (!produto) {
        throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
      }

      // Verificar estoque
      if (produto.quantidade < item.quantidade) {
        throw new BadRequestException(`Estoque insuficiente para o produto ${produto.nome}`);
      }

      // Reduzir o estoque
      produto.quantidade -= item.quantidade;
      await this.produtoRepository.save(produto);

      // Calcular o total
      totalVenda += produto.preco * item.quantidade;
    }

    const venda = this.vendaRepository.create({
      total: totalVenda,
    });

    await this.vendaRepository.save(venda);
    return venda;
  }

  private async findProdutoById(produtoId: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ where: { id: produtoId } });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${produtoId} não encontrado`);
    }
    return produto;
  }
}
