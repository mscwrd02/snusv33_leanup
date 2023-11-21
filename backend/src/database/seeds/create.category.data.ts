import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Categories } from '../../entities/Categories';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const categoryRepository = dataSource.getRepository(Categories);

    await categoryRepository.insert([
      {
        name: '산책로(공원)',
      },
      {
        name: '등산(오름)',
      },
      {
        name: '자연 경관',
      },
      {
        name: '해변',
      },
      {
        name: '테마파크',
      },
      {
        name: '문화유적',
      },
      {
        name: '박물관/미술관/전시',
      },
      {
        name: '레저(액티비티)',
      },
      {
        name: '농장',
      },
      {
        name: '절',
      },
      {
        name: '시장',
      },
      {
        name: '거리(도로)',
      },
      {
        name: '동물원',
      },
      {
        name: '카페',
      },
      {
        name: '공연',
      },
    ]);
  }
}
