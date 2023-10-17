import { ApiProperty } from '@nestjs/swagger';

export class OrderProduct {
  @ApiProperty()
  orderProductId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ format: 'date-time' })
  created_at: string;

  @ApiProperty({ format: 'date-time' })
  updated_at: string;

  @ApiProperty()
  order_id: number;

  @ApiProperty()
  product_id: number;
}

export class OrderResponseSwagger {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ format: 'date-time' })
  created_at: string;

  @ApiProperty({ format: 'date-time' })
  updated_at: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty({ type: [OrderProduct] })
  orderProduct: OrderProduct[];
}

export class OrderResponseSwaggerWithoutOrderProducts {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ format: 'date-time' })
  created_at: string;

  @ApiProperty({ format: 'date-time' })
  updated_at: string;

  @ApiProperty()
  user_id: string;
}
