import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  findOne(id: number): Promise<Produto | null> {
    return this.produtoRepository.findOneBy({ id });
  }

  create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(id: number, produto: Produto): Promise<Produto | null> {
    await this.produtoRepository.update(id, produto);
    const updatedProduto = await this.produtoRepository.findOneBy({ id });
    if (!updatedProduto) {
      throw new Error('Produto não encontrado');
    }
    return updatedProduto;
  }

  delete(id: number): Promise<void> {
    return this.produtoRepository.delete(id).then(() => undefined);
  }
}
