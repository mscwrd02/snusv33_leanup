import { CategoryResponseDto } from './../dto/category.response.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Plans } from 'src/entities/Plans';
import { Users } from 'src/entities/Users';
import { Spots } from 'src/entities/Spots';
import { PlanStatus } from 'src/entities/common/PlanStatus';
import { DataSource, Repository } from 'typeorm';
import { Recommends } from 'src/entities/Recommends';
import { Region } from 'src/entities/common/Region';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,

    @InjectRepository(CategoryResponses)
    private categoryResponsesRepository: Repository<CategoryResponses>,

    @InjectRepository(Plans)
    private plansRepository: Repository<Plans>,

    @InjectRepository(Spots)
    private spotRepository: Repository<Spots>,

    private dataSource: DataSource,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async submitCategories(userId: number, body: CategoryResponseDto) {
    await this.plansRepository
      .findOne({ where: { id: body.planId } })
      .then((plan) => {
        if (plan.status != PlanStatus.CATEGORYING)
          throw new BadRequestException('이미 취향 설문이 완료되었습니다');
      });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const parsedArray = JSON.parse(body.categoryList);

      const newResponse = new CategoryResponses();
      newResponse.categoryList = body.categoryList;
      newResponse.UserId = userId;
      newResponse.PlanId = body.planId;

      const user = await queryRunner.manager
        .getRepository(Users)
        .findOne({ where: { id: userId } });

      //참여자 숫자 늘리고, 모두 참여했으면 상태를 바꾸기
      const includedPlan = await queryRunner.manager
        .getRepository(Plans)
        .findOne({
          where: { id: body.planId },
          relations: ['ParticipantsList'],
        });

      const index = JSON.parse(includedPlan.participantsName).indexOf(
        user.nickname,
      );
      const categoryResponseStatus = JSON.parse(
        includedPlan.categoryResponseStatus,
      );
      categoryResponseStatus[index] = true;
      includedPlan.categoryResponseStatus = JSON.stringify(
        categoryResponseStatus,
      );
      if (
        categoryResponseStatus.filter((it) => it == true).length ==
        includedPlan.group_num
      ) {
        includedPlan.status = PlanStatus.SPOTING;
      }

      await Promise.all([
        queryRunner.manager.getRepository(CategoryResponses).save(newResponse),
        queryRunner.manager.getRepository(Plans).save(includedPlan),
      ]);

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('취향 설문 응답에 실패했습니다');
    } finally {
      await queryRunner.release();
    }
  }
  async isCategoryFormCompleted(planId: number) {
    const plan = await this.plansRepository.findOne({ where: { id: planId } });
    if (plan.status == PlanStatus.CATEGORYING) return false;
    else return true;
  }

  //response에 있는 숫자들을 바탕으로, 숫자에 해당하는 카테고리를 가지고 있는 spot들을 추천해줄거다.
  //확률 방식으로 구현하자.
  async addRecommends(planId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const myPlan = await queryRunner.manager
      .getRepository(Plans)
      .findOne({ where: { id: planId } });
    const availableRegion: Array<Region> = JSON.parse(myPlan.regionList);
    const categoryResponses = await queryRunner.manager
      .getRepository(CategoryResponses)
      .find({ where: { PlanId: planId } });

    const parsedResponses: Array<number> = categoryResponses.reduce(
      (acc, val) => {
        const parsedList = JSON.parse(val.categoryList);
        return acc.concat(parsedList);
      },
      [],
    );

    const categoryRecommendResults: Array<number> = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * parsedResponses.length);
      const randomElement = parsedResponses[randomIndex];
      categoryRecommendResults.push(randomElement);
    }

    try {
      for (const category of categoryRecommendResults) {
        const recommendedSpots = await queryRunner.manager
          .getRepository(Recommends)
          .find({ where: { PlanId: planId } });
        const recommendedSpotIds = recommendedSpots.map(
          (recommendedSpots) => recommendedSpots.SpotId,
        );

        const wow = await this.categoriesRepository.findOne({
          where: { id: category },
          relations: ['Spots'],
        });
        const availableSpotId = wow.Spots.map((it) => it.id);
        if (availableSpotId.length == 0)
          Array.from({ length: 100 }, (_, index) => index + 1).map((it) =>
            availableSpotId.push(it),
          );

        if (recommendedSpotIds.length == 0) {
          const spot = await queryRunner.manager
            .getRepository(Spots)
            .createQueryBuilder('spot')
            .where('spot.region IN (:...availableRegion)', { availableRegion })
            .andWhere('spot.id IN (:...availableSpotId)', { availableSpotId })
            .orderBy('spot.reviews', 'DESC')
            .getOne();
          await queryRunner.manager
            .getRepository(Recommends)
            .save({ PlanId: planId, SpotId: spot.id });
        } else {
          const spot = await queryRunner.manager
            .getRepository(Spots)
            .createQueryBuilder('spot')
            .where('spot.region IN (:...availableRegion)', { availableRegion })
            .andWhere('spot.id NOT IN (:...recommendedSpotIds)', {
              recommendedSpotIds,
            })
            .andWhere('spot.id IN (:...availableSpotId)', { availableSpotId })
            .orderBy('spot.reviews', 'DESC')
            .getOne();
          await queryRunner.manager
            .getRepository(Recommends)
            .save({ PlanId: planId, SpotId: spot.id });
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('관광지 추천에 실패했습니다');
    } finally {
      await queryRunner.release();
    }
  }
}
