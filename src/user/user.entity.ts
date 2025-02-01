import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Auth } from '../auth/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Auth, (auth) => auth.user)
  authSessions: Auth[];
}
