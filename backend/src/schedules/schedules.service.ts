import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRequestDto } from 'src/dto/schedule.request.dto';
import { Recommends } from 'src/entities/Recommends';
import { Schedules } from 'src/entities/Schedule';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    private dataSource: DataSource,
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
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const newSchedule = new Schedules();
      newSchedule.PlanId = schedule.planId;
      newSchedule.date = schedule.date;
      newSchedule.SpotId = schedule.spotId;
      newSchedule.time = schedule.time;

      const recommend = await queryRunner.manager
        .getRepository(Recommends)
        .findOne({
          where: { SpotId: schedule.spotId, PlanId: schedule.planId },
        });
      recommend.isInSchedule = true;

      await Promise.all([
        queryRunner.manager.getRepository(Schedules).save(newSchedule),
        queryRunner.manager.getRepository(Recommends).save(recommend),
      ]);
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new BadRequestException('일정을 생성하는데 실패했습니다.');
    } finally {
      await queryRunner.release();
    }
  }

  async deleteSchedule(schedule: ScheduleRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const recommend = await queryRunner.manager
        .getRepository(Recommends)
        .findOne({
          where: { SpotId: schedule.spotId, PlanId: schedule.planId },
        });
      recommend.isInSchedule = false;

      Promise.all([
        queryRunner.manager.getRepository(Schedules).delete({
          PlanId: schedule.planId,
          SpotId: schedule.spotId,
          date: schedule.date,
          time: schedule.time,
        }),
        queryRunner.manager.getRepository(Recommends).save(recommend),
      ]);
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new BadRequestException('존재하지 않는 일정입니다.');
    } finally {
      await queryRunner.release();
    }
  }
}
