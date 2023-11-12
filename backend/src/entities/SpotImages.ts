import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Spots } from './Spots';

@Entity({ schema: 'frienvel', name: 'spot_images' })
export class SpotImages {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'path', length: 250 })
  path: string;

  @ManyToOne(() => Spots, (spots) => spots.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SpotId', referencedColumnName: 'id' }])
  Spot: Spots;
}
