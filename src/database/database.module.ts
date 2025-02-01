import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';




@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'host',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'database',
      models: [],
      autoLoadModels: true,
    }),
  ],
  providers: [],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
