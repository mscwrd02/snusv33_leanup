import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { PlanStatus } from 'src/entities/common/PlanStatus';

export class PlanDetailResponseDto {
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
    description: '소유자 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @ApiProperty({
    example: 'abcdedf',
    description: '설문 주소 (hashId)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public link: string;

  @ApiProperty({
    example: '4',
    description: '동행 인원',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public groupNum: number;

  @ApiProperty({
    example: '["east", "west", "south"]',
    description: '지역 리스트 (string ,으로 구분하고 []로 감싸기)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public regionList: string;

  @ApiProperty({
    example: '["김철수", "김영희", "김민수"]',
    description: '동행 인원 이름 (string ,으로 구분하고 []로 감싸기)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public participantsName: string;

  @ApiProperty({
    example: '[true, false, false]',
    description: '동행 인원 취향 설문 결과 (string ,으로 구분하고 []로 감싸기)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public categoryResponseStatus: string;

  @ApiProperty({
    example: '[false, true, false]',
    description:
      '동행 인원 여행지 설문 결과 (string ,으로 구분하고 []로 감싸기)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public spotResponseStatus: string;

  @ApiProperty({
    example: '2023-12-21',
    description: '여행 시작일',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  public startDate: Date;

  @ApiProperty({
    example: '2023-12-24',
    description: '여행 종료일',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  public endDate: Date;

  @ApiProperty({
    example: PlanStatus.CATEGORYING,
    description: '상태 (취향조사중, 관광지조사중, 일정계획중, 계획완료 중 1개)',
    required: true,
  })
  @IsEnum(PlanStatus)
  @IsNotEmpty()
  public status: string;
}
