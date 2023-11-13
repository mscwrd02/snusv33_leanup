import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Users } from './entities/Users';
import { Categories } from './entities/Categories';
import { CategoryResponses } from './entities/CategoryResponses';
import { SpotImages } from './entities/SpotImages';
import { SpotResponses } from './entities/SpotResponses';
import { Plans } from './entities/Plans';
import { Spots } from './entities/Spots';
import { Recommends } from './entities/Recommends';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
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
  ],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
});

export default dataSource;
