import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'error_code' })
  code: number;

  @ApiProperty({ example: 'error message' })
  data: string;
}
