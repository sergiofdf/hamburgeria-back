import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindByEmailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
