import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PlanStatus } from 'src/entities/common/PlanStatus';

export class PlanSimpleResponseDto {
  // 여행계획 아이디 (int), 소유자 아이디 (int), 동행 인원 (Number)
  // 여행 시작일 (Date), 여행 종료일(Date), 상태 (enum: ready, ing, end), 카카오톡 프로필 (string [])

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
    description: '상태 (취향조사중, 관광지조사중, 일정계획중, 계획완료 중 1개)',
    required: true,
  })
  @IsEnum(PlanStatus)
  @IsNotEmpty()
  public status: string;

  @ApiProperty({
    example: '["https://image1.jpg", "https://image2.jpg"]',
    description: '카카오톡 프로필',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  public profileImg: string[];
}