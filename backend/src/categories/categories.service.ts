import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryResponseDto } from 'src/dto/category.response.dto';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Plans } from 'src/entities/Plans';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,

    @InjectRepository(CategoryResponses)
    private categoryResponsesRepository: Repository<CategoryResponses>,

    private dataSource: DataSource,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async submitCategories(userId: number | null, body: CategoryResponseDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const parsedArray = JSON.parse(body.categoryList);

      const duplicatedResponse = await queryRunner.manager
        .getRepository(CategoryResponses)
        .findOne({
          where: {
            participationName: body.participantName,
            PlanId: body.planId,
          },
        });

      if (duplicatedResponse) {
        duplicatedResponse.categoryList = body.categoryList;
        await queryRunner.manager
          .getRepository(CategoryResponses)
          .save(duplicatedResponse);
      } else {
        const newResponse = new CategoryResponses();
        newResponse.categoryList = body.categoryList;
        newResponse.participationName = body.participantName;
        if (userId) newResponse.UserId = userId;
        newResponse.PlanId = body.planId;

        const includedPlan = await queryRunner.manager
          .getRepository(Plans)
          .findOne({ where: { id: body.planId } });
        includedPlan.categoryParticipations += 1;

        await Promise.all([
          queryRunner.manager
            .getRepository(CategoryResponses)
            .save(newResponse),
          queryRunner.manager.getRepository(Plans).save(includedPlan),
        ]);
      }
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('취향 설문 응답에 실패했습니다');
    } finally {
      await queryRunner.release();
    }
  }
}
