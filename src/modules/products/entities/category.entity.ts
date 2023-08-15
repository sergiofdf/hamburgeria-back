import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ format: 'date-time' })
  created_at: string;
  @ApiProperty({ format: 'date-time' })
  updated_at: string;
}
