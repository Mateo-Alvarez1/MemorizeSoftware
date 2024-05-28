import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  ParseUUIDPipe,
  Get,
  Patch,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createRegisterDto: CreateRegisterDto, @GetUser() user: User) {
    return this.registerService.create(createRegisterDto, user);
  }

  @Get(":term")
  @UseGuards(AuthGuard())
  findByterm(@Param('term', ParseUUIDPipe) term: string) {
    return this.registerService.findAll(term);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(id, updateRegisterDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.registerService.remove(id);
  }
}
