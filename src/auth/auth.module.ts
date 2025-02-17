import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'minha-chave-secreta', // Substitua por uma variável de ambiente em produção
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
