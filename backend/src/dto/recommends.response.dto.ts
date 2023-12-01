import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SpotInfoDto {
  // 장소 아이디 (int), 장소 이름 (string), 장소 요약 (string), 장소 이미지 저장 경로 (string), 장소 주소 (string)

  @ApiProperty({
    example: '1',
    description: '장소 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public spotId: number;

  @ApiProperty({
    example: '한라산',
    description: '장소 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: '대한민국에서 가장 높은 산이다.',
    description: '장소 요약',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public overview: string;

  @ApiProperty({
    example: 'category1/image1.jpg',
    description: '장소 이미지',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public imagePath: string;

  @ApiProperty({
    example: '제주시 조천읍 조함해안로 110',
    description: '장소 주소',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public address: string;
}

export class RecommendsResponseDto {
  // 점수 (int), 장소 (SpotInfoDto[])

  @ApiProperty({
    example: '800',
    description: '장소 점수',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public score: number;

  @ApiProperty({
    description: '추천 장소',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpotInfoDto)
  @IsNotEmpty()
  public spots: SpotInfoDto[];
}
