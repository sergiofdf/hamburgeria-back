import { Address } from '../entities/address.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address?: Address;
}
