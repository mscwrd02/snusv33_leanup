import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Spots } from './Spots';

@Entity({ schema: 'frienvel', name: 'categories' })
export class Categories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @ManyToMany(() => Spots, (spots) => spots.Categories)
  @JoinTable({
    name: 'spot_categories',
    joinColumn: {
      name: 'CategoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'SpotId',
      referencedColumnName: 'id',
    },
  })
  Spots: Spots[];
}
