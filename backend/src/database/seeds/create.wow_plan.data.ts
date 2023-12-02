import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Region } from '../../entities/common/Region';
import { Plans } from '../../entities/Plans';
import { PlanStatus } from '../../entities/common/PlanStatus';
import { Recommends } from '../../entities/Recommends';
export default class PlanSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const plansRepository = dataSource.getRepository(Plans);
    await plansRepository.insert([
      {
        userId: 1,
        link: '1234',
        group_num: 4,
        regionList: JSON.stringify([Region.WEST]),
        participantsName: '[]',
        categoryResponseStatus: '[]',
        spotResponseStatus: '[]',
        startDate: new Date('2023-12-23'),
        endDate: new Date('2023-12-25'),
        status: PlanStatus.CATEGORYING,
      },
      {
        userId: 1,
        link: '2345',
        group_num: 2,
        regionList: JSON.stringify([Region.NORTH]),
        participantsName: '[]',
        categoryResponseStatus: '[]',
        spotResponseStatus: '[]',
        startDate: new Date('2023-01-03'),
        endDate: new Date('2023-01-05'),
        status: PlanStatus.CATEGORYING,
      },
    ]);
    const recommendRepository = dataSource.getRepository(Recommends);
    await recommendRepository.insert([
      {
        PlanId: 1,
        SpotId: 1,
        score: 500,
        comments: '["좋은거같음", "진짜싫음"]',
      },
      {
        PlanId: 1,
        SpotId: 2,
        score: 300,
        comments: '["좋은거같음", "진짜싫음"]',
      },
      {
        PlanId: 1,
        SpotId: 3,
        score: 600,
        comments: '["좋은거같음", "진짜싫음"]',
      },
      {
        PlanId: 1,
        SpotId: 4,
        score: 700,
      },
      {
        PlanId: 1,
        SpotId: 5,
        score: 500,
        comments: '["좋은거같음", "진짜싫음"]',
      },
    ]);
  }
}
