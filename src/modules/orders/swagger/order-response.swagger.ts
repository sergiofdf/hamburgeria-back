import { ApiProperty } from '@nestjs/swagger';

export class OrderProduct {
  @ApiProperty()
  orderProductId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ format: 'date-time' })
  created_at: string;

  @ApiProperty({ format: 'date-time' })
  updated_at: string;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  product_id: string;
}

export class OrderResponseSwagger {
  @ApiProperty()
  orderId: string;

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
