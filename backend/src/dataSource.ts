import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Users } from './entities/Users';
import { Categories } from './entities/Categories';
import { CategoryResponses } from './entities/CategoryResponses';
import { SpotImages } from './entities/SpotImages';
import { SpotResponses } from './entities/SpotResponses';
import { Plans } from './entities/Plans';
import { Spots } from './entities/Spots';
import { Recommends } from './entities/Recommends';
import { Schedules } from './entities/Schedule';
import { SeederOptions } from 'typeorm-extension';
import { SpotCategories } from './entities/SpotCategories';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Users,
    Categories,
    CategoryResponses,
    Plans,
    SpotImages,
    SpotResponses,
    Spots,
    Recommends,
    Schedules,
    SpotCategories,
  ],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
  seeds: [process.env.SEEDER_PATH],
};

const dataSource = new DataSource(options);

export default dataSource;
