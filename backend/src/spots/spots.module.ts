import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spots } from 'src/entities/Spots';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Plans } from 'src/entities/Plans';
import { Recommends } from 'src/entities/Recommends';
import { SpotResponses } from 'src/entities/SpotResponses';
import { Users } from 'src/entities/Users';
import { SpotCategories } from 'src/entities/SpotCategories';
import { SpotImages } from 'src/entities/SpotImages';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Spots,
      Recommends,
      Plans,
      Categories,
      CategoryResponses,
      SpotResponses,
      Users,
      SpotCategories,
      SpotImages,
    ]),
  ],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
