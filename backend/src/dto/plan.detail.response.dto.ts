import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum PlanStatus {
  PLANNING = '계획중',
  ING = '여행중',
  END = '여행완료',
}

export class PlanDetailResponseDto {
  // 여행계획 아이디 (int), 소유자 아이디 (int), 동행 인원 (Number), 지역 (east, west, south, north)
  // 여행 시작일(Date), 여행 종료일(Date), 상태 (enum: ready, ing, end), 카톡 프로필 이미지 (string array)

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
    example: '4',
    description: '동행 인원',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public groupNum: number;

  @ApiProperty({
    example: 'east, west, south',
    description: '지역 리스트 (string ,으로 구분)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public regionList: string;

  @ApiProperty({
    example: '2023-12-21',
    description: '여행 시작일',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  public startDate: Date;

  @ApiProperty({
    example: '2023-12-24',
    description: '여행 종료일',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  public endDate: Date;

  @ApiProperty({
    example: '계획중',
    description: '상태 (계획중, 여행중, 여행완료 중 1개)',
    required: true,
  })
  @IsEnum(PlanStatus)
  @IsNotEmpty()
  public status: string;
}
