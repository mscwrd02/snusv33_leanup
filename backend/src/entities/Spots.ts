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
import { Region } from './common/Region';
import { Recommends } from './Recommends';
import { ApiProperty } from '@nestjs/swagger';
import { Schedules } from './Schedule';
import { SpotCategories } from './SpotCategories';

@Entity({ schema: 'frienvel', name: 'spots' })
export class Spots {
  @ApiProperty({
    example: 1,
    description: '장소 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '한라산',
    description: '장소 이름',
  })
  @Column('varchar', {
    name: 'name',
    length: 100,
    default: '장소 이름을 입력해주세요.',
  })
  name: string;

  @ApiProperty({
    example: '제주시 한림읍 애월리 123-4',
    description: '장소의 주소',
  })
  @Column('varchar', {
    name: 'address',
    length: 50,
    default: '장소의 주소를 입력해주세요.',
  })
  address: string;

  @ApiProperty({
    example: '운영시간',
    description: '10:00~18:00',
  })
  @Column('varchar', {
    name: 'hours',
    length: 50,
    default: '운영시간을 입력해주세요',
  })
  hours: string;

  @ApiProperty({
    example: '1만원',
    description: '입장료',
  })
  @Column('varchar', {
    name: 'fee',
    length: 100,
    default: '입장료를 입력해주세요.',
  })
  fee: string;

  @ApiProperty({
    example: '1시간',
    description: '소요 시간',
  })
  @Column('varchar', {
    name: 'taken_time',
    length: 100,
    default: '소요 시간을 입력해주세요.',
  })
  takenTime: string;

  @ApiProperty({
    example:
      '가을, 겨울에는 억새밭이 매력적인 제주도의 대표 오름. 초심자도 쉽게 올라갈 수 있다.',
    description: '한 줄 요약',
  })
  @Column('varchar', {
    name: 'overview',
    length: 100,
    default: '한 줄 요약을 입력해주세요.',
  })
  overview: string;

  @ApiProperty({
    example: '제주 오름 추천 리스트에 빠지지 않고 등장하는 핫플레이스 오름',
    description: '특징 1',
  })
  @Column('varchar', {
    name: 'feature1',
    length: 200,
    default: '특징 1을 입력해주세요.',
  })
  feature1: string;

  @ApiProperty({
    example: '제주 오름 추천 리스트에 빠지지 않고 등장하는 핫플레이스 오름',
    description: '특징 2',
  })
  @Column('varchar', {
    name: 'feature2',
    length: 200,
    default: '특징 2를 입력해주세요.',
  })
  feature2: string;

  @ApiProperty({
    example: '제주 오름 추천 리스트에 빠지지 않고 등장하는 핫플레이스 오름',
    description: '특징 3',
  })
  @Column('varchar', {
    name: 'feature3',
    length: 200,
    default: '특징 3를 입력해주세요.',
  })
  feature3: string;

  @ApiProperty({
    example: '324',
    description: '리뷰 개수',
  })
  @Column('int', { name: 'reviews', default: 0 })
  reviews: number;

  @ApiProperty({
    example: 'east',
    description: '지역',
  })
  @Column({ type: 'enum', name: 'region', enum: Region })
  region: Region;

  @ApiProperty({
    example: 'https://www.naver.com',
    description: '네이버 링크',
  })
  @Column({
    type: 'varchar',
    name: 'link',
    length: 100,
    default: '링크를 입력해주세요.',
  })
  link: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @OneToMany(() => SpotImages, (spotImages) => spotImages.Spot)
  Images: SpotImages[];

  @ManyToMany(() => Categories, (categories) => categories.Spots)
  Categories: Categories[];

  @OneToMany(() => Recommends, (recommends) => recommends.Spot)
  Recommends: Recommends[];

  @OneToMany(() => Schedules, (schedules) => schedules.Spot)
  Schedules: Schedules[];

  @OneToMany(() => SpotCategories, (spotCategories) => spotCategories.Spot)
  SpotCategories: SpotCategories[];
}
