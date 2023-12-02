import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plans } from './Plans';
import { Users } from './Users';

@Entity({ schema: 'frienvel', name: 'category_responses' })
export class CategoryResponses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'category_list', length: 50 })
  categoryList: string;

  @Column('int', { name: 'UserId', nullable: true })
  UserId: number;

  @Column('int', { name: 'PlanId', nullable: true })
  PlanId: number;

  @ManyToOne(() => Plans, (plans) => plans.CategoryResponses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PlanId', referencedColumnName: 'id' }])
  Plan: Plans;

  @ManyToOne(() => Users, (users) => users.CategoryResponses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
