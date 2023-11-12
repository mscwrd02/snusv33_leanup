import { Plans } from './Plans';
import { Platform } from './common/Platforms';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'frienvel', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', {
    name: 'password',
    length: 100,
    select: false,
    nullable: true,
  })
  password: string;

  @Column({ type: 'enum', name: 'platform', enum: Platform, nullable: true })
  platform: Platform;

  @Column('varchar', { name: 'profile_image', nullable: true, length: 250 })
  profileImage: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Plans, (plans) => plans.Owner)
  Plans: Plans[];
}
