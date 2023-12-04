import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Plans } from './Plans';
import { Spots } from './Spots';
import { Categories } from './Categories';

@Entity({ schema: 'frienvel', name: 'spot_categories' })
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
