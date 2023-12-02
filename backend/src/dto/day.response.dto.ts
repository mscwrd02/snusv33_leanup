import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class DayResponseDto {
  @ApiProperty({
    example: '2',
    description: '일차',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  day: number;

  @ApiProperty({
    example: '1',
    description: '장소 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  spotId: number;

  @ApiProperty({
    example: '새별오름',
    description: '장소 이름',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: [
      'https://s3.image.com/1',
      'https://s3.image.com/2',
      'https://s3.image.com/3',
    ],
    description: '장소 이미지 URL 배열',
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  paths: string[];
}
