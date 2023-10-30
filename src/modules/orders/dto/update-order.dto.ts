import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  status: OrderStatus;
  @ApiProperty()
  @IsOptional()
  total: number;
}
