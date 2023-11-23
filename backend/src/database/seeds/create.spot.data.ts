import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Spots } from '../../entities/Spots';
import { Region } from '../../entities/common/Region';
export default class SpotSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotsRepository = dataSource.getRepository(Spots);
    await spotsRepository.insert([
      {
        address: ' ',
        reviews: 1,
        region: Region.EAST,
      },
      {
        address: ' ',
        reviews: 1,
        region: Region.WEST,
      },
      {
        address: ' ',
        reviews: 1,
        region: Region.SOUTH,
      },
      {
        address: ' ',
        reviews: 1,
        region: Region.NORTH,
      },
    ]);
  }
}
