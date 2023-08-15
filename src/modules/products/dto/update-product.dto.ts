import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  size?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  price?: number;
  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  category_id?: number;
}
