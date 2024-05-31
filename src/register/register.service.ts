import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class RegisterService {

  secret:Buffer
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    private readonly dataSource: DataSource,
  ) {
    this.secret = crypto.randomBytes(32);
  }

  async create(createRegisterDto: CreateRegisterDto, user: User) {
    try {
      const { password, ...registerDetails } = createRegisterDto;
      const { plainPassword } = this.encriptedPassword(password , this.secret);

      
      const register = this.registerRepository.create({
        ...registerDetails,
        password: plainPassword ,
        user: user,
      });

      await this.registerRepository.save(register);
      return register;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(term: string) {
    let registers: Register[];

    registers = await this.registerRepository
      .createQueryBuilder('register')
      .innerJoinAndSelect('register.user', 'user')
      .where('user.id =:userId', { userId: term })
      .getMany();

    if (!registers) {
      throw new NotFoundException(`Product with ${term} not found`);
    }

    // const password = registers.map(item => item.password).toString()
    // const cypher = this.encriptedPassword(password, this.secret);
    // console.log(cypher);
    // const desencriptedPassword = this.desencriptedPassword(cypher , this.secret)

    return registers;
  }

  async remove(id: string) {
    const { affected } = await this.registerRepository.delete(id);
    if (affected === 0)
      throw new BadRequestException(
        `Not found product whit ${id} in the database`,
      );

    return;
  }

  async update(id: string, updateRegisterDto: UpdateRegisterDto, user: User) {
    const { ...registerProperties } = updateRegisterDto;
    const register = await this.registerRepository.preload({
      ...registerProperties,
      id: id,
    });

    if (!register)
      throw new NotFoundException(`Not found product whit id: ${id}`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      register.user = user;
      await queryRunner.manager.save(register);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Unexpected error check the logs');
  }

  private encriptedPassword(password: string , secret:Buffer) {
    try {
      const algorithim = 'aes-256-cbc';
      const initialValue = crypto.randomBytes(16);

      const cypher = crypto.createCipheriv(algorithim, secret, initialValue);
      const encriptedPassword = Buffer.concat([
        cypher.update(password),
        cypher.final(),
      ]);
      return {
        initialValue: initialValue.toString("hex"),
        plainPassword: encriptedPassword.toString('hex')
      };
      
    } catch (error) {
      console.log(error);
    }
  }

  //  private desencriptedPassword(password:any , secret:Buffer) {
  //    try {
  //      const algorithim = 'aes-256-cbc';
  //      const initialValue = Buffer.from(password.initialValue , 'hex')
  //      const passwordValue = Buffer.from(password.plainPassword , 'hex')

  //      const decypher = crypto.createDecipheriv(algorithim, secret, initialValue);
            
  //     return Buffer.concat([decypher.update(passwordValue),decypher.final()]).toString();      
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  }
}
