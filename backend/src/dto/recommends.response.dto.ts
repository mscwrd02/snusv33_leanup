import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Spots } from 'src/entities/Spots';

export class CommentDto {
  UserId: number;
  name: string;
  comment: string;
  constructor(UserId: number, name: string, comment: string) {
    this.UserId = UserId;
    this.name = name;
    this.comment = comment;
  }
}

export class RecommendsResponseDto {
  @ApiProperty({
    example: 1,
    description: '장소 추천 점수',
  })
  @IsNumber()
  score: number;

  @ApiProperty({
    example: [
      new CommentDto(1, '재혁', '여기 꼭 가자'),
      new CommentDto(2, '광진', '여기 절대 가지말자'),
    ],
    description: '장소 추천에 대한 코멘트',
    isArray: true,
  })
  comments: CommentDto[];

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
