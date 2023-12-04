import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Plans } from 'src/entities/Plans';
import { Spots } from 'src/entities/Spots';
import { SpotResponses } from 'src/entities/SpotResponses';
import { SpotImages } from 'src/entities/SpotImages';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Categories } from 'src/entities/Categories';
import { Recommends } from 'src/entities/Recommends';
import { Schedules } from 'src/entities/Schedule';
import { SpotCategories } from 'src/entities/SpotCategories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Plans,
      Spots,
      SpotResponses,
      SpotImages,
      CategoryResponses,
      Categories,
      Recommends,
      Schedules,
      SpotCategories,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
