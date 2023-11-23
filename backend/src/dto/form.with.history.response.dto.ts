import { ApiProperty } from '@nestjs/swagger';
import { Spots } from 'src/entities/Spots';

export class submitResponseDto {
  @ApiProperty({
    example: '1',
    description: '설문 응답점수',
    required: true,
  })
  score: number;

  @ApiProperty({
    example: '1',
    description: '장소 아이디',
    required: true,
  })
  spotId: number;
}

export class FormWithHistoryResponseDto {
  @ApiProperty({
    type: [Spots],
    description: '추천 장소들',
  })
  spotForm: Spots[];

  @ApiProperty({
    type: [submitResponseDto],
    description: '사용자가 이미 제출한 응답들',
  })
  alreadySubmitResponses: submitResponseDto[];
}