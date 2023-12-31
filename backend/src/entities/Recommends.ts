import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Plans } from './Plans';
import { Spots } from './Spots';

@Entity({ schema: process.env.DB_DATABSE, name: 'recommends' })
export class Recommends {
  @Column('int', { name: 'score', default: 0 })
  score: number;

  @Column('varchar', {
    name: 'comments',
    nullable: true,
    default: '[]',
    length: 500,
  })
  comments: string;

  @Column('int', { primary: true, name: 'PlanId' })
  PlanId: number;

  @Column('int', { primary: true, name: 'SpotId' })
  SpotId: number;

  @Column('boolean', { default: false, name: 'is_in_schedule' })
  isInSchedule: boolean;

  @Column('int', { default: 0, name: 'day' })
  day: number;

  @ManyToOne(() => Plans, (plans) => plans.Recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PlanId', referencedColumnName: 'id' }])
  Plan: Plans;

  @ManyToOne(() => Spots, (spots) => spots.Recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SpotId', referencedColumnName: 'id' }])
  Spot: Spots;
}
