import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveOrderProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Id do produto no pedido deve ser informado!' })
  orderProductId: string;
}
