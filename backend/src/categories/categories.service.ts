import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryResponseDto } from 'src/dto/category.response.dto';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,

    @InjectRepository(CategoryResponses)
    private categoryResponsesRepository: Repository<CategoryResponses>,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async submitCategories(userId: number | null, body: CategoryResponseDto) {
    try {
      const parsedArray = JSON.parse(body.categoryList);
      const categoryResponse = new CategoryResponses();
      categoryResponse.categoryList = body.categoryList;
      categoryResponse.participationName = body.participantName;
      if (userId) categoryResponse.UserId = userId;
      categoryResponse.PlanId = body.planId;
      await this.categoryResponsesRepository.save(categoryResponse);
      return true;
    } catch (err) {
      throw new BadRequestException('취향 설문 응답에 실패했습니다');
    }
  }
}
