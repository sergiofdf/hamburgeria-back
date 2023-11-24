import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    try {
      if (!value) return null;
      const val = new Date(value);
      return val;
    } catch (error) {
      throw new BadRequestException('Data inválida.');
    }
  }
}
