import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Spots } from './Spots';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: process.env.DB_DATABSE, name: 'categories' })
export class Categories {
  @ApiProperty({
    example: 1,
    description: '관광지 클래스의 id값',
    required: true,
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '자연경관',
    description: '관광지 클래스의 이름',
    required: true,
  })
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
