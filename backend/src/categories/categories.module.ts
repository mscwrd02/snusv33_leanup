import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, CategoryResponses])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
