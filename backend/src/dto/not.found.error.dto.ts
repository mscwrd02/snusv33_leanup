import { ApiProperty } from '@nestjs/swagger';

export class NotFoundErrorDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 404 })
  code: number;

  @ApiProperty({ example: 'Not Found' })
  data: string;
}
