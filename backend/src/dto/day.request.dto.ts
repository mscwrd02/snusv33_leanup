import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class DayRequestDto {
  @ApiProperty({
    example: '1',
    description: '여행계획 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @ApiProperty({
    example: '1',
    description: '장소 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  spotId: number;

  @ApiProperty({
    example: '2',
    description: '일차',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  day: number;
}
