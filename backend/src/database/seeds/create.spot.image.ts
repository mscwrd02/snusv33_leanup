import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import { SpotImages } from '../../entities/SpotImages';
import { SpotCategories } from '../../entities/SpotCategories';

export default class CSVSpotImageSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotImagesRepository = dataSource.getRepository(SpotImages);
    const spotCategoryRepository = dataSource.getRepository(SpotCategories);
    const parseOptions = {
      columns: true,
    };
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
