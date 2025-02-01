import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new Error('Usuário não encontrado');

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Salvar token no banco
    const auth = this.authRepository.create({ user, token });
    await this.authRepository.save(auth);

    return { access_token: token };
  }

  async revokeToken(token: string) {
    const authEntry = await this.authRepository.findOne({ where: { token } });
    if (!authEntry) throw new Error('Token inválido');

    authEntry.revoked = true;
    await this.authRepository.save(authEntry);
  }
}
