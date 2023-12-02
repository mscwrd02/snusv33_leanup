import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TimeBlock } from 'src/entities/common/TimeBlock';

export class ScheduleRequestDto {
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
    example: '1',
    description: '일차',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  date: number;

  @ApiProperty({
    example: 'morning',
    description: 'morning, afternoon1, afternoon2, evening, night 중 하나',
    required: true,
  })
  @IsEnum(TimeBlock)
  @IsNotEmpty()
  time: TimeBlock;
}
