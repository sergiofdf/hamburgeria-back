import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'O cliente deve ser informado!' })
  user_id: string;
}
