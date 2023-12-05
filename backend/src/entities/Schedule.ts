import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Plans } from './Plans';
import { Spots } from './Spots';
import { TimeBlock } from './common/TimeBlock';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: process.env.DB_DATABSE, name: 'schedules' })
export class Schedules {
  @ApiProperty({
    example: '1',
    description: '일차',
    required: true,
  })
  @Column('int', { name: 'date' })
  date: number;

  @ApiProperty({
    example: 1,
    description: '계획 id',
    required: true,
  })
  @Column('int', { primary: true, name: 'PlanId' })
  PlanId: number;

  @ApiProperty({
    example: 1,
    description: '장소 id',
    required: true,
  })
  @Column('int', { primary: true, name: 'SpotId' })
  SpotId: number;

  @ApiProperty({
    example: 'morning',
    description: '시간대',
    required: true,
  })
  @Column({ type: 'enum', name: 'time', enum: TimeBlock })
  time: TimeBlock;

  @ManyToOne(() => Plans, (plans) => plans.Schedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PlanId', referencedColumnName: 'id' }])
  Plan: Plans;

  @ManyToOne(() => Spots, (spots) => spots.Schedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SpotId', referencedColumnName: 'id' }])
  Spot: Spots;
}
