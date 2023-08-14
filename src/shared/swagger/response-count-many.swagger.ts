import { ApiProperty } from '@nestjs/swagger';

export class ResponseCountMany {
  @ApiProperty()
  count: number;
}
