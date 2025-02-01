import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Produto } from '../produto/produto.entity';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column('decimal')
  quantidade: number;

  @Column('decimal')
  total: number;
}
