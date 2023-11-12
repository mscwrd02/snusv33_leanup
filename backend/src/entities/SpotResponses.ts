import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plans } from './Plans';

@Entity({ schema: 'frienvel', name: 'spot_responses' })
export class SpotResponses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'participant_name', length: 30 })
  participationName: string;

  @Column('int', { name: 'score' })
  score: number;

  @Column('int', { name: 'spot_id' })
  spotId: number;

  @ManyToOne(() => Plans, (plans) => plans.SpotResponses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PlanId', referencedColumnName: 'id' }])
  Plan: Plans;
}
