import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpotImages } from './SpotImages';
import { Categories } from './Categories';
import { Plans } from './Plans';
import { Region } from './common/Region';
import { Recommends } from './Recommends';

@Entity({ schema: 'frienvel', name: 'spots' })
export class Spots {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'address', length: 100 })
  address: string;

  @Column('varchar', { name: 'hours', length: 100, nullable: true })
  hours: string;

  @Column('varchar', { name: 'fee', length: 100, nullable: true })
  fee: string;

  @Column('varchar', { name: 'taken_time', length: 100, nullable: true })
  takenTime: string;

  @Column('varchar', { name: 'overview', length: 100, nullable: true })
  overview: string;

  @Column('varchar', { name: 'feature1', length: 100, nullable: true })
  feature1: string;

  @Column('varchar', { name: 'feature2', length: 100, nullable: true })
  feature2: string;

  @Column('varchar', { name: 'feature3', length: 100, nullable: true })
  feature3: string;

  @Column('int', { name: 'reviews', default: 0 })
  reviews: number;

  @Column({ type: 'enum', name: 'region', enum: Region })
  region: Region;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SpotImages, (spotImages) => spotImages.Spot)
  Images: SpotImages[];

  @ManyToMany(() => Categories, (categories) => categories.Spots)
  Categories: Categories[];

  @ManyToMany(() => Plans, (plans) => plans.SpotList)
  Plans: Plans[];

  @OneToMany(() => Recommends, (recommends) => recommends.Spot)
  Recommends: Recommends[];
}