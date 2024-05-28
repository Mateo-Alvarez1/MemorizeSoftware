import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
// 1. Generamos el recurso y marcamos la clase como @Entity y cada propiedad con el @Column
// 2. En el Modulo del Recurso hace forFeature de la entidad para conectarlo con la base de datos
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
