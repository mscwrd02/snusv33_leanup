import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Plans } from './Plans';
import { Spots } from './Spots';
import { TimeBlock } from './common/TimeBlock';

@Entity({ schema: 'frienvel', name: 'schedules' })
export class Schedules {
  @Column('date', { name: 'date' })
  date: Date;

  @Column('int', { primary: true, name: 'PlanId' })
  PlanId: number;

  @Column('int', { primary: true, name: 'SpotId' })
  SpotId: number;

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
