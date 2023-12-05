import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plans } from './Plans';
import { Users } from './Users';

@Entity({ schema: 'frienvel', name: 'spot_responses' })
export class SpotResponses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'score' })
  score: number;

  @Column('int', { name: 'spot_id' })
  spotId: number;

  @Column('int', { name: 'UserId', nullable: true })
  UserId: number;

  @Column('int', { name: 'PlanId', nullable: true })
  PlanId: number;

  @Column('varchar', { name: 'comment', nullable: true, length: 100 })
  comment: string;

  @ManyToOne(() => Plans, (plans) => plans.SpotResponses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PlanId', referencedColumnName: 'id' }])
  Plan: Plans;

  @ManyToOne(() => Users, (users) => users.SpotResponses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
