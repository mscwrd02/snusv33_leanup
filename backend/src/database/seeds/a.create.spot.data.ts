import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Spots } from '../../entities/Spots';
import { parse } from 'csv-parse';
import * as fs from 'fs';

export default class CSVSpotSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotsRepository = dataSource.getRepository(Spots);
    const spots: Spots[] = [];
    const parseOptions = {
      columns: true,
    };
    fs.createReadStream(process.env.CSV_PATH + '/spots.csv')
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
  }
}