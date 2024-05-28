import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [TypeOrmModule.forFeature([Register]), AuthModule],
})
export class RegisterModule {}
