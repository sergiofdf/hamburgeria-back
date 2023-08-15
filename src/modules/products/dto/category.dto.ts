import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome deve ser informado!' })
  name: string;
}
