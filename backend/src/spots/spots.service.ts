import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RecommendsResponseDto,
  SpotInfoDto,
} from 'src/dto/recommends.response.dto';
import { SpotResponseDto } from 'src/dto/spot.response.dto';
import { Categories } from 'src/entities/Categories';
import { CategoryResponses } from 'src/entities/CategoryResponses';
import { Plans } from 'src/entities/Plans';
import { Recommends } from 'src/entities/Recommends';
import { SpotResponses } from 'src/entities/SpotResponses';
import { Spots } from 'src/entities/Spots';
import { Users } from 'src/entities/Users';
import { PlanStatus } from 'src/entities/common/PlanStatus';
import { Region } from 'src/entities/common/Region';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

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

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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
        .leftJoinAndSelect('spot.Categories', 'categories')
        .leftJoinAndSelect('spot.Images', 'images')
        .where('recommends.PlanId = :planId', { planId })
        .getMany();

      const recommendSpotsWithCategories = recommends.map((recommend) => {
        return { ...recommend.Spot };
      });
      return recommendSpotsWithCategories;
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

  convertScore(score: number): number {
    const scoreMap: Record<number, number> = {
      1: -200,
      2: -100,
      3: 100,
      4: 200,
    };

    return scoreMap[score] || 0;
  }

  async submitSpotResponse(userId: number, body: SpotResponseDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const plan = await this.plansRepository.findOne({
        where: { id: body.planId },
        relations: ['ParticipantsList'],
      });
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (
        !plan.ParticipantsList.find((participant) => participant.id === user.id)
      ) {
        throw new BadRequestException('참여하지 않은 여행입니다.');
      } else if (plan.status != PlanStatus.SPOTING) {
        throw new BadRequestException('관광지 설문 단계가 아닙니다.');
      }

      const [spotResponse, recommendSpot] = await Promise.all([
        queryRunner.manager.getRepository(SpotResponses).findOne({
          where: { UserId: userId, spotId: body.spotId, PlanId: body.planId },
        }),
        queryRunner.manager.getRepository(Recommends).findOne({
          where: { SpotId: body.spotId, PlanId: body.planId },
        }),
      ]);
      if (spotResponse) {
        // 수정해서 다시 제출
        recommendSpot.score +=
          this.convertScore(body.score) - this.convertScore(spotResponse.score); // 기존에 잘못 더해진 score 고려해서 update
        const comments = JSON.parse(recommendSpot.comments);
        const index = comments.indexOf(spotResponse.comment);
        comments[index] = body.comment;
        recommendSpot.comments = JSON.stringify(comments);

        await Promise.all([
          queryRunner.manager.getRepository(Recommends).save(recommendSpot),
          queryRunner.manager
            .getRepository(SpotResponses)
            .update(
              { id: spotResponse.id },
              { score: body.score, comment: body.comment },
            ),
        ]);
      } else {
        recommendSpot.score += this.convertScore(body.score);
        const comments = JSON.parse(recommendSpot.comments);
        comments.push(body.comment);
        recommendSpot.comments = JSON.stringify(comments);

        await Promise.all([
          queryRunner.manager.getRepository(Recommends).save(recommendSpot),
          queryRunner.manager.getRepository(SpotResponses).save({
            participantName: user.nickname,
            score: body.score,
            spotId: body.spotId,
            UserId: userId,
            PlanId: body.planId,
            comment: body.comment,
          }),
        ]);
      }

      if (body.isLast) {
        // 해당 이용자의 마지막 제출일 경우
        const index = JSON.parse(plan.participantsName).indexOf(user.nickname);
        const spotResponseStatus = JSON.parse(plan.spotResponseStatus);
        spotResponseStatus[index] = true;
        plan.spotResponseStatus = JSON.stringify(spotResponseStatus);
        if (
          spotResponseStatus.filter((it) => it == true).length == plan.group_num
        ) {
          plan.status = PlanStatus.PLANNIG;
        }
        await queryRunner.manager.getRepository(Plans).save(plan);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('관광지 설문 제출에 실패했습니다');
    } finally {
      await queryRunner.release();
    }
  }

  async getRecommend(planId: number) {
    try {
      // recommendSpot 가져와서 score 내림차순으로 정렬
      const recommends = await this.recommendsRepository
        .createQueryBuilder('recommends')
        .leftJoinAndSelect('recommends.Spot', 'spot')
        .leftJoinAndSelect('spot.Images', 'images')
        .where('recommends.PlanId = :planId', { planId })
        .orderBy('recommends.score', 'DESC')
        .getMany();

      // score가 같은 spot들은 array로 묶어서 하나의 score에 대해서 {score: int, spot: SpotInfoDto[]}의 형태로 만듦
      const recommendsResponseArray: RecommendsResponseDto[] =
        recommends.reduce((acc, val) => {
          const lastElement = acc[acc.length - 1];
          const spotInfo: SpotInfoDto = {
            spotId: val.Spot.id,
            name: val.Spot.name,
            overview: val.Spot.overview,
            imagePath:
              val.Spot.Images.length > 0 ? val.Spot.Images[0].path : '', // 우선 첫번째 이미지만 보내기
            address: val.Spot.address,
          };
          if (lastElement && lastElement.score === val.score) {
            lastElement.spots.push(spotInfo);
          } else {
            const recommendsResponse: RecommendsResponseDto = {
              score: val.score,
              spots: [spotInfo],
            };
            acc.push(recommendsResponse);
          }
          return acc;
        }, []);
      return recommendsResponseArray;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('추천 장소 조회에 실패했습니다');
    }
  }

  async getSpotInfo(spotId: number) {
    try {
      const spot = await this.spotsRepository.findOne({
        where: { id: spotId },
        relations: ['Images', 'Categories'],
      });

      return spot;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('장소 정보 조회에 실패했습니다');
    }
  }
}
