import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ScheduleRequestDto } from 'src/dto/schedule.request.dto';
import { Schedules } from 'src/entities/Schedule';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('SCHEDULE')
@Controller('api/schedules')
export class SchedulesController {
  constructor(
    @Inject(SchedulesService) private schedulesService: SchedulesService,
  ) {}

  @ApiOkResponse({
    description: '일정 조회 성공',
    type: Schedules,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: '일정 조회 실패',
  })
  @Get(':planId')
  async getScheduleByPlanId(@Param('planId') planId: string) {
    return await this.schedulesService.getScheduleByPlanId(+planId);
  }

  @ApiCreatedResponse({
    description: '일정 생성 성공',
  })
  @ApiBadRequestResponse({
    description: '일정 생성 실패',
  })
  @Post()
  async createSchedule(@Body() schedule: ScheduleRequestDto) {
    await this.schedulesService.createSchedule(schedule);
    return 'ok';
  }
}
