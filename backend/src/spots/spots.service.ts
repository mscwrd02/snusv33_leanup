import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Plans } from 'src/entities/Plans';
import { Recommends } from 'src/entities/Recommends';
import { SpotResponses } from 'src/entities/SpotResponses';
import { Spots } from 'src/entities/Spots';
import { Region } from 'src/entities/common/Region';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SpotsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Plans)
    private plansRepository: Repository<Plans>,

    @InjectRepository(Recommends)
    private recommendsRepository: Repository<Recommends>,

    @InjectRepository(Spots)
    private spotsRepository: Repository<Spots>,

    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,

    @InjectRepository(CategoryResponses)
    private categoryResponsesRepository: Repository<CategoryResponses>,

    @InjectRepository(SpotResponses)
    private spotResponsesRepository: Repository<SpotResponses>,
  ) {}
  async addRecommends(planId: number) {
    const presentRecommends = await this.recommendsRepository.find({
      where: { PlanId: planId },
    });
    if (presentRecommends.length > 2) {
      throw new BadRequestException('이미 장소 추천이 완료되었습니다');
    }
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
    for (let i = 0; i < 2; i++) {
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

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('관광지 추천에 실패했습니다');
    } finally {
      await queryRunner.release();
    }
  }

  async getRecommendSpot(planId: number) {
    try {
      const recommends = await this.recommendsRepository
        .createQueryBuilder('recommends')
        .leftJoinAndSelect('recommends.Spot', 'spot')
        .where('recommends.PlanId = :planId', { planId })
        .getMany();
      const recommendSpots = recommends.map((recommend) => recommend.Spot);
      return recommendSpots;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('추천 장소 조회에 실패했습니다');
    }
  }

  async alreadySubmitResponses(planId: number, userId: number) {
    try {
      return await this.spotResponsesRepository.find({
        where: { PlanId: planId, UserId: userId },
        select: ['score', 'spotId'],
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('이미 응답한 정보 조회에 실패했습니다');
    }
  }
}
