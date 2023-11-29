import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class SpotResponseDto {
  // 여행계획 아이디 (int), 장소 아이디 (int), 점수 (int), 코멘트 (string), 마지막 여부 (boolean)
  @ApiProperty({
    example: '1',
    description: '여행계획 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public planId: number;

  @ApiProperty({
    example: '1',
    description: '장소 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public spotId: number;

  @ApiProperty({
    example: '4',
    description: '점수 (1~4)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: '점수는 1~4 사이로 입력해주세요' })
  @Max(4, { message: '점수는 1~4 사이로 입력해주세요' })
  public score: number;

  @ApiProperty({
    example: '좋아요',
    description: '코멘트 (선택) (100자 이내)',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100, { message: '코멘트는 100자 이내로 입력해주세요' })
  public comment: string;

  @ApiProperty({
    example: 'true',
    description: '마지막 응답인지 여부',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public isLast: boolean;
}
