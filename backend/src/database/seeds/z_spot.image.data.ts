import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SpotImages } from '../../entities/SpotImages';
export default class ImageSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotImagesRepository = dataSource.getRepository(SpotImages);

    await spotImagesRepository.insert([
      {
        SpotId: 1,
        path: 'https://tripwiz-spot-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%83%88%EB%B3%84%EC%98%A4%EB%A6%84.jpg',
      },
      {
        SpotId: 2,
        path: 'https://tripwiz-spot-image-bucket.s3.ap-northeast-2.amazonaws.com/981.jpg',
      },
      {
        SpotId: 3,
        path: 'https://tripwiz-spot-image-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B8%88%EC%98%A4%EB%A6%84.jpg',
      },
      {
        SpotId: 4,
        path: 'https://tripwiz-spot-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%96%91.jpg',
      },
      {
        SpotId: 5,
        path: 'https://tripwiz-spot-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9A%A9%EC%98%A4%EB%A6%84.jpg',
      },
    ]);
  }
}
