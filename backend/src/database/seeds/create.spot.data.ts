import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Spots } from '../../entities/Spots';
import { Region } from '../../entities/common/Region';
import { Categories } from '../../entities/Categories';
export default class SpotSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotsRepository = dataSource.getRepository(Spots);
    const categoriesRepository = dataSource.getRepository(Categories);
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

    const exampleSpot = new Spots();
    exampleSpot.address = '제주시';
    exampleSpot.reviews = 1;
    exampleSpot.region = Region.EAST;
    const exampleCategory = await categoriesRepository.findOne({
      where: {
        name: '자연 경관',
      },
    });
    exampleSpot.Categories = [exampleCategory];
    await spotsRepository.save(exampleSpot);
  }
}
