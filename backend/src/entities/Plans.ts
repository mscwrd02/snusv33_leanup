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
import { Spots } from './Spots';
import { Recommends } from './Recommends';

@Entity({ schema: 'frienvel', name: 'plans' })
export class Plans {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'link', unique: true, length: 50 })
  link: string;

  @Column('int', { name: 'group_num' })
  group_num: number;

  @Column('int', { name: 'category_participants', default: 0 })
  categoryParticipations: number;

  @Column('int', { name: 'spot_participants', default: 0 })
  spotParticipations: number;

  @Column('date', { name: 'start_date' })
  startDate: Date;

  @Column('date', { name: 'end_date' })
  endDate: Date;

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

  @ManyToMany(() => Spots, (spots) => spots.Plans)
  @JoinTable({
    name: 'spot_forms',
    joinColumn: {
      name: 'PlanId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'SpotId',
      referencedColumnName: 'id',
    },
  })
  SpotList: Spots[];

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
}
