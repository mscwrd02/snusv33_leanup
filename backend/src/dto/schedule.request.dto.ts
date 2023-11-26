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
    example: '2023-12-21',
    description: '날짜',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty({
    example: 'morning',
    description: 'morning, afternoon1, afternoon2, evening, night 중 하나',
    required: true,
  })
  @IsEnum(TimeBlock)
  @IsNotEmpty()
  time: TimeBlock;
}
