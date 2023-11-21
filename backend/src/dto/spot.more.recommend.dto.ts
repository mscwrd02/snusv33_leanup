import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SpotMoreRecommendDto {
  @ApiProperty({
    example: 1,
    description: '여행계획 아이디',
  })
  @IsNumber()
  @IsNotEmpty()
  planId: number;
}
