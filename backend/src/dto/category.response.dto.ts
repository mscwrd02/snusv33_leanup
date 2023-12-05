import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CategoryResponseDto {
  @ApiProperty({
    example: '[1, 4, 7]',
    description: '사용자가 선택한 category id의 리스트',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  categoryList: string;

  @ApiProperty({
    example: '1',
    description: '여행계획의 id',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  planId: number;
}
