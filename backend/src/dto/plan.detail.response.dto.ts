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
  // 여행계획 아이디 (int), 소유자 아이디 (int), 설문 주소 (string), 동행 인원 (Number), 지역 (east, west, south, north)
  // 취향설문참여인원 (int), 여행지설문참여인원 (int), 여행 시작일(Date), 여행 종료일(Date), 상태 (enum: ready, ing, end)

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
    example: 'https://tripwiz.com/abcdedf',
    description: '설문 주소',
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
    example: 4,
    description: '취향설문참여인원',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public categoryParticipants: number;

  @ApiProperty({
    example: 4,
    description: '여행지설문참여인원',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public spotParticipants: number;

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
    example: '취향조사중',
    description: '상태 (취향조사중, 관광지조사중, 여행중, 여행완료 중 1개)',
    required: true,
  })
  @IsEnum(PlanStatus)
  @IsNotEmpty()
  public status: string;
}
