import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Address } from '../entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
  @ApiProperty()
  @IsEmail(undefined, { message: 'E-mail inválido!' })
  email: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Senha deve ser informada!' })
  password: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Telefone deve ser informado!' })
  phone_number: string;
  @ApiProperty()
  @IsOptional()
  address?: Address;
}
