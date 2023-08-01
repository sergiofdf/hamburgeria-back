import { IsEmail, IsNotEmpty } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
  @IsEmail(undefined, { message: 'E-mail inválido!' })
  email: string;
  @IsNotEmpty({ message: 'Senha deve ser informada!' })
  password: string;
  @IsNotEmpty({ message: 'Telefone deve ser informado!' })
  phone_number: string;
  address?: Address;
}
