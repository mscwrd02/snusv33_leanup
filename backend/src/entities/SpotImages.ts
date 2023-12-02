import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Spots } from './Spots';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'frienvel', name: 'spot_images' })
export class SpotImages {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'https://www.s3.com/image.jpg',
    description: '사진 url',
    required: true,
  })
  @Column('varchar', { name: 'path', length: 250 })
  path: string;

  @ManyToOne(() => Spots, (spots) => spots.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SpotId', referencedColumnName: 'id' }])
  Spot: Spots;
}
