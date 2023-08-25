import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RoleOptions } from '../entities/role-options.entity';
import { Address } from '../entities/address.entity';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  password?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  phone_number?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  user_active?: boolean;
  @ApiProperty({ required: false })
  @IsOptional()
  roles?: RoleOptions[];
  @ApiProperty({ required: false })
  @IsOptional()
  address?: Address;
}
