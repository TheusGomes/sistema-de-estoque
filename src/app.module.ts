import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProdutoModule, VendaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
