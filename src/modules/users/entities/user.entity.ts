import { RoleOptions } from './role-options.entity';
import { Address } from './address.entity';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  user_active: boolean;
  @ApiProperty()
  roles: RoleOptions[];
  @ApiProperty({ format: 'date-time' })
  created_at: Date | string;
  @ApiProperty({ format: 'date-time' })
  updated_at: Date | string;
  @ApiProperty({ required: false })
  address?: Address;
}
