import { ApiProperty } from '@nestjs/swagger';
import { Schedules } from 'src/entities/Schedule';

export class ScheduleResponseDto extends Schedules {
  @ApiProperty({
    example: '새별오름',
    description: '장소 이름',
    required: true,
  })
  name: string;
}
