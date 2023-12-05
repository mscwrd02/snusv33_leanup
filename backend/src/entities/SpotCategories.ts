import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Spots } from './Spots';
import { Categories } from './Categories';

@Entity({ schema: process.env.DB_DATABSE, name: 'spot_categories' })
export class SpotCategories {
  @Column('int', { primary: true, name: 'SpotId' })
  SpotId: number;

  @Column('int', { primary: true, name: 'CategoryId' })
  CategoryId: number;

  @ManyToOne(() => Categories, (categories) => categories.SpotCategories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CategoryId', referencedColumnName: 'id' }])
  Category: Categories;

  @ManyToOne(() => Spots, (spots) => spots.SpotCategories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SpotId', referencedColumnName: 'id' }])
  Spot: Spots;
}
