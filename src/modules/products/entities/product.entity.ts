import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  size: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty({ format: 'date-time' })
  created_at?: string;
  @ApiProperty({ format: 'date-time' })
  updated_at?: string;
  @ApiProperty()
  category_id?: number;
}
