import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.authSessions, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  token: string;

  @Column({ default: false })
  revoked: boolean; // Se o token foi revogado

  @CreateDateColumn()
  createdAt: Date;
}
