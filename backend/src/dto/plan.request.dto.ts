import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlanRequestDto {
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
    description: '지역 리스트 (string ,으로 구분하고 []로 감싸기])',
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
}
