import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Descrição deve ser informada!' })
  description: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Tamanho/quantidade deve ser informado!' })
  size: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Preço deve ser informado!' })
  price: number;
  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'A categoria do produto deve ser informada!' })
  category_id: number;
}
