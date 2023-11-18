import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserResponseDto } from './user.response.dto';

export class PlanRequestDto {
  // 소유자 정보 (UserResponseDto), 동행 인원 (Number), 지역 (east, west, south, north), 여행 시작일(Date), 여행 종료일(Date)
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
}
