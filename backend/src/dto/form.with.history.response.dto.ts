import { ApiProperty } from '@nestjs/swagger';
import { Categories } from 'src/entities/Categories';
import { SpotImages } from 'src/entities/SpotImages';
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

  @ApiProperty({
    example: '집가고싶당',
    description: '이전 댓글',
    required: true,
  })
  comment: string;
}

export class SpotWithCategoryAndImage extends Spots {
  @ApiProperty({
    type: [Categories],
    description: '장소에 대한 카테고리들',
  })
  Categories: Categories[];

  @ApiProperty({
    type: [SpotImages],
    description: '장소 사진들',
  })
  Images: SpotImages[];
}

export class FormWithHistoryResponseDto {
  @ApiProperty({
    type: [SpotWithCategoryAndImage],
    description: '추천 장소들',
  })
  spotForm: SpotWithCategoryAndImage[];

  @ApiProperty({
    type: [submitResponseDto],
    description: '사용자가 이미 제출한 응답들',
  })
  alreadySubmitResponses: submitResponseDto[];
}
