import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRequestDto } from 'src/dto/schedule.request.dto';
import { Schedules } from 'src/entities/Schedule';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async getScheduleByPlanId(planId: number) {
    try {
      const schedules = await this.schedulesRepository.find({
        where: { PlanId: planId },
      });
      return schedules;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('일정 조회에 실패했습니다.');
    }
  }

  async createSchedule(schedule: ScheduleRequestDto) {
    try {
      const newSchedule = new Schedules();
      newSchedule.PlanId = schedule.planId;
      newSchedule.date = schedule.date;
      newSchedule.SpotId = schedule.spotId;
      newSchedule.time = schedule.time;
      await this.schedulesRepository.save(newSchedule);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('일정을 생성하는데 실패했습니다.');
    }
    return true;
  }
}