import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plans } from 'src/entities/Plans';

@Module({
  imports: [TypeOrmModule.forFeature([Plans])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
