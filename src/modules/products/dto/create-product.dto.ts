import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
  @IsNotEmpty({ message: 'Descrição deve ser informada!' })
  description: string;
  @IsNotEmpty({ message: 'Tamanho/quantidade deve ser informado!' })
  size: string;
  @IsNotEmpty({ message: 'Preço deve ser informado!' })
  price: number;
  imageUrl?: string;
  @IsNotEmpty({ message: 'A categoria do produto deve ser informada!' })
  category_id: number;
}
