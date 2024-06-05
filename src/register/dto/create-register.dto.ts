import { IsString,  MaxLength, MinLength } from 'class-validator';

export class CreateRegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MaxLength(50)
  password: string;
}
