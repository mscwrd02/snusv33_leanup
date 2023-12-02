import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DayRequestDto } from 'src/dto/day.request.dto';
import { ScheduleRequestDto } from 'src/dto/schedule.request.dto';
import { Recommends } from 'src/entities/Recommends';
import { Schedules } from 'src/entities/Schedule';
import { DataSource, QueryBuilder, Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,

    @InjectRepository(Recommends)
    private recommendRepository: Repository<Recommends>,
  ) {}

  async getScheduleByPlanId(planId: number) {
    try {
      const schedules = await this.schedulesRepository
        .createQueryBuilder('schedules')
        .innerJoin('schedules.Spot', 'spot')
        .select('schedules.date', 'date')
        .addSelect('schedules.time', 'time')
        .addSelect('schedules.SpotId', 'SpotId')
        .addSelect('schedules.PlanId', 'PlanId')
        .addSelect('spot.name', 'name')
        .where('schedules.PlanId = :planId', { planId })
        .orderBy('schedules.date', 'ASC')
        .getRawMany();
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

  async getDayByPlanId(planId: number) {
    try {
      const rawRecommends = await this.recommendRepository
        .createQueryBuilder('recommends')
        .innerJoin('recommends.Spot', 'spot')
        .innerJoin('spot.Images', 'images')
        .select('recommends.day', 'day')
        .addSelect('recommends.SpotId', 'spotId')
        .addSelect('spot.name', 'name')
        .addSelect('images.path', 'path')
        .where('recommends.PlanId = :planId', { planId })
        .andWhere('recommends.day != 0')
        .orderBy('recommends.day', 'ASC')
        .getRawMany();

      // 쿼리 결과를 변환
      const recommends = [];
      const spotWithImages = {};

      for (const recommend of rawRecommends) {
        if (!spotWithImages[recommend.spotId]) {
          spotWithImages[recommend.spotId] = {
            day: recommend.day,
            spotId: recommend.spotId,
            name: recommend.name,
            paths: [recommend.path],
          };
        } else {
          spotWithImages[recommend.spotId].paths.push(recommend.path);
        }
      }

      for (const spotId in spotWithImages) {
        recommends.push(spotWithImages[spotId]);
      }
      return recommends;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('일차 정보 조회에 실패했습니다.');
    }
  }

  async addDay(dayRequest: DayRequestDto) {
    const recommend = await this.recommendRepository.findOne({
      where: { PlanId: dayRequest.planId, SpotId: dayRequest.spotId },
    });
    if (!recommend)
      throw new BadRequestException(
        '추천목록에 없는 장소를 일정에 추가할 수 없습니다',
      );
    recommend.day = dayRequest.day;
    await this.recommendRepository.save(recommend);
    return true;
  }

  async deleteDay(dayRequest: DayRequestDto) {
    const recommend = await this.recommendRepository.findOne({
      where: {
        PlanId: dayRequest.planId,
        SpotId: dayRequest.spotId,
        day: dayRequest.day,
      },
    });
    if (!recommend)
      throw new BadRequestException(
        '추천목록에 없는 장소를 일정에서 삭제할 수 없습니다',
      );
    recommend.day = 0;
    await this.recommendRepository.save(recommend);
    return true;
  }
}
