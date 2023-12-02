import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Spots } from 'src/entities/Spots';

export class RecommendsResponseDto {
  @ApiProperty({
    example: 1,
    description: '장소 추천 점수',
  })
  @IsNumber()
  score: number;

  @ApiProperty({
    example: '["좋아요", "재밌어요"]',
    description: '장소 추천에 대한 코멘트',
  })
  @IsString()
  comments: string;

  @ApiProperty({
    example: false,
    description: '여행 계획에 포함되었는지 여부',
  })
  @IsNotEmpty()
  isInSchedule: boolean;

  @ApiProperty({
    type: Spots,
  })
  @IsNotEmpty()
  Spot: Spots;
}
