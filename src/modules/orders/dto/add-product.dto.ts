import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class AddProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Quantidade deve ser informada!' })
  quantity: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'O número do pedido deve ser informado!' })
  order_id: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'O id do produto deve ser informado!' })
  product_id: number;
}

export class AddProductDtoArray {
  @ApiProperty({ type: () => [AddProductDto] })
  @ValidateNested({ each: true })
  @Type(() => AddProductDto)
  orderProducts: AddProductDto[];
}
