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
import {  DataSource, Repository } from 'typeorm';
import * as CryptoJs from 'crypto-js'

@Injectable()
export class RegisterService {

  private secret_key:string;

  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    private readonly dataSource: DataSource,
  ) {
    this.secret_key = process.env.SECRET_ENCODED_KEY
  }

  async create(createRegisterDto: CreateRegisterDto, user: User) {
    try {
      const { password, ...registerDetails } = createRegisterDto;

      const encodedPassword= this.encodedPassword(password , this.secret_key)
      
      const register = this.registerRepository.create({
        ...registerDetails,
        password: encodedPassword,
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

    const decodedPasswords = registers.map(item => ({
      id: item.id,
      name: item.name,
      password: this.desencodedPassword(item.password, this.secret_key), 
    }));

    return decodedPasswords
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

    const encodedPassword = this.encodedPassword(register.password , this.secret_key)
    register.password = encodedPassword
    
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

  private encodedPassword(password: string , key:any) {
    try {
      
      const cypherText = CryptoJs.AES.encrypt(password , key).toString()
      return cypherText  
    } catch (error) {
      console.log(error);
      
    }
  }

  private desencodedPassword(cypher: string  ,key:string) {
    try {
      const bytes = CryptoJs.AES.decrypt(cypher , key)
      if (bytes.sigBytes > 0 ) {
        const decryptedData = bytes.toString(CryptoJs.enc.Utf8)
        return decryptedData
      }
    } catch (error) {
      throw new Error('Decryption Failed')
    }
}
}