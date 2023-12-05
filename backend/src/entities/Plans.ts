import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { CategoryResponses } from './CategoryResponses';
import { SpotResponses } from './SpotResponses';
import { Recommends } from './Recommends';
import { PlanStatus } from './common/PlanStatus';
import { Schedules } from './Schedule';

@Entity({ schema: process.env.DB_DATABSE, name: 'plans' })
export class Plans {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number;

  @Column('varchar', {
    name: 'link',
    nullable: true,
    unique: true,
    length: 100,
  })
  link: string;

  @Column('int', { name: 'group_num' })
  group_num: number;

  @Column('varchar', { name: 'region_list', length: 50 })
  regionList: string;

  @Column('varchar', { name: 'participants_name', length: 100 })
  participantsName: string;

  @Column('varchar', { name: 'category_response_status', length: 100 })
  categoryResponseStatus: string;

  @Column('varchar', { name: 'spot_response_status', length: 100 })
  spotResponseStatus: string;

  @Column('date', { name: 'start_date' })
  startDate: Date;

  @Column('date', { name: 'end_date' })
  endDate: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: PlanStatus,
    default: PlanStatus.CATEGORYING,
  })
  status: PlanStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.Plans, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  Owner: Users;

  @OneToMany(
    () => CategoryResponses,
    (CategoryResponses) => CategoryResponses.Plan,
  )
  CategoryResponses: CategoryResponses[];

  @OneToMany(() => SpotResponses, (spotResponses) => spotResponses.Plan)
  SpotResponses: SpotResponses[];

  @ManyToMany(() => Users, (users) => users.Plans)
  @JoinTable({
    name: 'groups',
    joinColumn: {
      name: 'PlanId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
  })
  ParticipantsList: Users[];

  @OneToMany(() => Recommends, (recommends) => recommends.Plan)
  Recommends: Recommends[];

  @OneToMany(() => Schedules, (schedules) => schedules.Plan)
  Schedules: Schedules[];
}
