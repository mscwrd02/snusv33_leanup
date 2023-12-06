import { Column, Entity } from 'typeorm';

@Entity({ schema: process.env.DB_DATABSE, name: 'spot_categories' })
export class SpotCategories {
  @Column('int', { primary: true, name: 'SpotId' })
  SpotId: number;

  @Column('int', { primary: true, name: 'CategoryId' })
  CategoryId: number;
}
