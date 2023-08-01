import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
}
