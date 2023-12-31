import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PlanStatus } from 'src/entities/common/PlanStatus';

export class PlanSimpleResponseDto {
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
    example: PlanStatus.CATEGORYING,
    description: '상태 (취향조사중, 관광지조사중, 여행중, 여행완료 중 1개)',
    required: true,
  })
  @IsEnum(PlanStatus)
  @IsNotEmpty()
  public status: string;

  @ApiProperty({
    example: '["홍길동", "철수", "짱구"]',
    description: '이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public participantsName: string;

  @ApiProperty({
    example: '["https://image1.jpg", "https://image2.jpg"]',
    description: '카카오톡 프로필',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public profileImg: string;
}
