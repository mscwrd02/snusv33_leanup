import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Region } from '../../entities/common/Region';
import { Plans } from '../../entities/Plans';
import { PlanStatus } from '../../entities/common/PlanStatus';
export default class PlanSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const plansRepository = dataSource.getRepository(Plans);
    await plansRepository.insert([
      {
        userId: 1,
        link: '1234',
        group_num: 4,
        regionList: JSON.stringify([Region.WEST]),
        categoryParticipations: 0,
        spotParticipations: 0,
        participantsName: '',
        categoryResponseStatus: '',
        spotResponseStatus: '',
        startDate: new Date('2023-12-23'),
        endDate: new Date('2023-12-25'),
        status: PlanStatus.CATEGORYING,
      },
      {
        userId: 1,
        link: '2345',
        group_num: 6,
        regionList: JSON.stringify([Region.NORTH]),
        categoryParticipations: 0,
        spotParticipations: 0,
        participantsName: '',
        categoryResponseStatus: '',
        spotResponseStatus: '',
        startDate: new Date('2023-01-03'),
        endDate: new Date('2023-01-05'),
        status: PlanStatus.CATEGORYING,
      },
    ]);
  }
}
