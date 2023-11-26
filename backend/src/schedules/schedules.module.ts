import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/Schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
