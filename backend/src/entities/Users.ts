import { CategoryResponses } from './CategoryResponses';
import { Plans } from './Plans';
import { SpotResponses } from './SpotResponses';
import { Platform } from './common/Platform';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('email', ['email'], { unique: true })
@Entity({ schema: process.env.DB_DATABSE, name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 50 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 50 })
  nickname: string;

  @Column('varchar', {
    name: 'password',
    length: 100,
    select: false,
    nullable: true,
  })
  password: string;

  @Column({ type: 'enum', name: 'platform', enum: Platform })
  platform: Platform;

  @Column('varchar', { name: 'profile_image', nullable: true, length: 200 })
  profileImage: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Plans, (plans) => plans.Owner)
  Plans: Plans[];

  @OneToMany(
    () => CategoryResponses,
    (CategoryResponses) => CategoryResponses.User,
  )
  CategoryResponses: CategoryResponses[];

  @OneToMany(() => SpotResponses, (SpotResponses) => SpotResponses.User)
  SpotResponses: SpotResponses[];

  @ManyToMany(() => Plans, (plans) => plans.ParticipantsList)
  ParticipatedPlans: Plans[];
}
