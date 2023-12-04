import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import { SpotImages } from '../../entities/SpotImages';
import { SpotCategories } from '../../entities/SpotCategories';
import { Spots } from '../../entities/Spots';

export default class CSVSpotImageSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotsRepository = dataSource.getRepository(Spots);
    const spots: Spots[] = [];
    const parseOptions = {
      columns: true,
    };
    await fs
      .createReadStream(process.env.CSV_PATH + '/spots.csv')
      .pipe(parse(parseOptions))
      .on('data', (row) => {
        const spot = new Spots();
        spot.name = row.name;
        spot.address = row.address;
        spot.hours = row.hours;
        spot.fee = row.fee;
        spot.takenTime = row.taken_time;
        spot.overview = row.overview;
        spot.feature1 = row.feature1;
        spot.feature2 = row.feature2;
        spot.feature3 = row.feature3;
        spot.reviews = parseInt(row.reviews);
        spot.region = row.region;
        spot.link = row.link;
        spots.push(spot);
      })
      .on('end', async () => {
        await spotsRepository.save(spots);
        console.log(
          'CSV file successfully processed and saved in spotsRepository',
        );
      });
    const spotImagesRepository = dataSource.getRepository(SpotImages);
    const spotCategoryRepository = dataSource.getRepository(SpotCategories);
    const spotImages: SpotImages[] = [];
    fs.createReadStream(process.env.CSV_PATH + '/spot_images.csv')
      .pipe(parse(parseOptions))
      .on('data', (row) => {
        const spotImage = new SpotImages();
        spotImage.SpotId = parseInt(row.SpotId);
        spotImage.path = row.path;
        spotImages.push(spotImage);
      })
      .on('end', async () => {
        await spotImagesRepository.save(spotImages);
        console.log(
          'CSV file successfully processed and saved in spotImagesRepository',
        );
      });
    const spotCategories: SpotCategories[] = [];
    fs.createReadStream(process.env.CSV_PATH + '/spot_category.csv')
      .pipe(parse(parseOptions))
      .on('data', (row) => {
        const spotCategory = new SpotCategories();
        spotCategory.SpotId = parseInt(row.SpotId);
        spotCategory.CategoryId = parseInt(row.CategoryId);
        spotCategories.push(spotCategory);
      })
      .on('end', async () => {
        await spotCategoryRepository.save(spotCategories);
        console.log(
          'CSV file successfully processed and saved in spotCategoriesRepository',
        );
      });
  }
}
