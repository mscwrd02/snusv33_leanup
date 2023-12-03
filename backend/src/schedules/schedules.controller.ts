import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ScheduleRequestDto } from 'src/dto/schedule.request.dto';
import { Schedules } from 'src/entities/Schedule';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  PostDayRequestDto,
  DeleteDayRequestDto,
} from 'src/dto/day.request.dto';
import { DayResponseDto } from 'src/dto/day.response.dto';
import { ScheduleResponseDto } from 'src/dto/schedule.response.dto';

@ApiTags('SCHEDULE')
@Controller('api/schedules')
export class SchedulesController {
  constructor(
    @Inject(SchedulesService) private schedulesService: SchedulesService,
  ) {}

  @ApiOperation({ summary: '전체 시간표 일정 조회하기' })
  @ApiOkResponse({
    description: '전체 일정 조회 성공',
    type: ScheduleResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: '전체 일정 조회 실패',
  })
  @Get('all/:planId')
  async getScheduleByPlanId(@Param('planId') planId: string) {
    return await this.schedulesService.getScheduleByPlanId(+planId);
  }

  @ApiOperation({ summary: '시간표 일정 생성하기' })
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

  @ApiOperation({ summary: '시간표 일정 삭제하기' })
  @ApiCreatedResponse({
    description: '일정 삭제 성공',
  })
  @ApiBadRequestResponse({
    description: '일정 삭제 실패',
  })
  @Delete()
  async deleteSchedule(@Body() schedule: ScheduleRequestDto) {
    await this.schedulesService.deleteSchedule(schedule);
    return 'ok';
  }

  @ApiOperation({ summary: 'n일차에 여행지 리스트에 장소 추가하기' })
  @ApiCreatedResponse({
    description: '해당일차에 장소를 추가하는데 성공했습니다',
  })
  @ApiBadRequestResponse({
    description: '추천목록에 없는 장소를 일정에 추가할 수 없습니다',
  })
  @Post('/day')
  async updateDay(@Body() dayRequest: PostDayRequestDto) {
    await this.schedulesService.addDay(dayRequest);
    return 'ok';
  }

  @ApiOperation({ summary: 'n일차 여행지 리스트에 존재하는 장소 삭제하기' })
  @ApiCreatedResponse({
    description: '해당일차에 장소를 삭제하는데 성공했습니다',
  })
  @ApiBadRequestResponse({
    description: '존재하지 않는 일차입니다',
  })
  @Delete('/day')
  async deleteDay(@Body() dayRequest: DeleteDayRequestDto) {
    await this.schedulesService.deleteDay(dayRequest);
    return 'ok';
  }

  @ApiOperation({ summary: '여행지 리스트에 추가된 장소 조회하기' })
  @ApiOkResponse({
    description: '일차 장소 정보 조회 성공',
    type: DayResponseDto,
    isArray: true,
  })
  @Get('/day/:planId')
  async getDayByPlanId(@Param('planId') planId: string) {
    return await this.schedulesService.getDayByPlanId(+planId);
  }
}
