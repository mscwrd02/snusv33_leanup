import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/Schedule';
import { Recommends } from 'src/entities/Recommends';
import { Plans } from 'src/entities/Plans';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules, Recommends, Plans])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
