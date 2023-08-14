import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Id do produto no pedido deve ser informado!' })
  orderProductId: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Quantidade deve ser informada!' })
  quantity: number;
}
