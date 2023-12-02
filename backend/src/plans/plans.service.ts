import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanDetailResponseDto } from 'src/dto/plan.detail.response.dto';
import { Plans } from 'src/entities/Plans';
import { IsNull, Not, Repository } from 'typeorm';
import { PlanSimpleResponseDto } from 'src/dto/plan.simple.response.dto';
import { Users } from 'src/entities/Users';
import { PlanRequestDto } from 'src/dto/plan.request.dto';
import { PlanStatus } from 'src/entities/common/PlanStatus';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plans)
    private plansRepository: Repository<Plans>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createPlan(
    userId: number,
    body: PlanRequestDto,
  ): Promise<PlanDetailResponseDto> {
    // 여행 계획 생성하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const newPlan = new Plans();
    newPlan.userId = userId;
    newPlan.link = null; // 임시
    newPlan.group_num = body.groupNum;
    newPlan.regionList = body.regionList;
    newPlan.participantsName = JSON.stringify([user.nickname]);
    newPlan.categoryResponseStatus = JSON.stringify([false]);
    newPlan.spotResponseStatus = JSON.stringify([false]);
    newPlan.startDate = body.startDate;
    newPlan.endDate = body.endDate;
    newPlan.status = PlanStatus.CATEGORYING;
    newPlan.ParticipantsList = [user];
    const savedPlan = await this.plansRepository.save(newPlan);

    // 여행 계획 생성 후 link 생성
    const updatePlan = await this.plansRepository.findOne({
      where: { id: savedPlan.id },
    });
    updatePlan.link = btoa(userId.toString() + '_' + updatePlan.id.toString()); // binary to ASCII
    await this.plansRepository.save(updatePlan);

    const planDetailResponse: PlanDetailResponseDto = {
      planId: savedPlan.id,
      userId: savedPlan.userId,
      link: updatePlan.link,
      groupNum: savedPlan.group_num,
      regionList: savedPlan.regionList,
      participantsName: JSON.stringify([user.nickname]),
      categoryResponseStatus: JSON.stringify([false]),
      spotResponseStatus: JSON.stringify([false]),
      startDate: savedPlan.startDate,
      endDate: savedPlan.endDate,
      status: savedPlan.status,
    };

    return Promise.resolve(planDetailResponse);
  }

  async joinPlan(
    userId: number,
    planId: number,
  ): Promise<PlanDetailResponseDto> {
    // 여행 계획 참여하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const plan = await this.plansRepository.findOne({
      where: { id: planId },
      relations: ['ParticipantsList'],
    });
    if (plan.group_num === plan.ParticipantsList.length) {
      return Promise.reject('이미 참여인원이 꽉 찼습니다.');
    } else if (
      plan.ParticipantsList.map((participant) => participant.id).includes(
        userId,
      )
    ) {
      return Promise.reject('이미 참여하셨습니다.');
    }

    plan.ParticipantsList.push(user);
    plan.participantsName = JSON.stringify(
      JSON.parse(plan.participantsName).concat(user.nickname),
    );
    plan.categoryResponseStatus = JSON.stringify(
      JSON.parse(plan.categoryResponseStatus).concat(false),
    );
    plan.spotResponseStatus = JSON.stringify(
      JSON.parse(plan.spotResponseStatus).concat(false),
    );
    await this.plansRepository.save(plan);

    const planDetailResponse: PlanDetailResponseDto = {
      planId: plan.id,
      userId: plan.userId,
      link: plan.link,
      groupNum: plan.group_num,
      regionList: plan.regionList,
      participantsName: plan.participantsName,
      categoryResponseStatus: plan.categoryResponseStatus,
      spotResponseStatus: plan.spotResponseStatus,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
    };
    return Promise.resolve(planDetailResponse);
  }

  async updatePlan() {
    //TODO : 여행 계획 수정하기
  }

  async deletePlan(planId: number): Promise<void> {
    // 여행 계획 삭제하기
    await this.plansRepository.delete(planId);
  }

  async getPlanWithId(planId: number): Promise<PlanDetailResponseDto> {
    // 여행 계획 plan id로 조회하기
    const plan = await this.plansRepository.findOne({
      where: { id: planId },
      relations: ['ParticipantsList'],
    });
    const planDetailResponse: PlanDetailResponseDto = {
      planId: plan.id,
      userId: plan.userId,
      link: plan.link,
      groupNum: plan.group_num,
      regionList: plan.regionList,
      participantsName: plan.participantsName,
      categoryResponseStatus: plan.categoryResponseStatus,
      spotResponseStatus: plan.spotResponseStatus,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
    };
    return Promise.resolve(planDetailResponse);
  }

  async getPlanWithHashId(hashId: string): Promise<PlanDetailResponseDto> {
    // 여행 계획 hash id로 조회하기
    const plan = await this.plansRepository.findOne({
      where: { link: hashId },
      relations: ['ParticipantsList'],
    });
    const planDetailResponse: PlanDetailResponseDto = {
      planId: plan.id,
      userId: plan.userId,
      link: plan.link,
      groupNum: plan.group_num,
      regionList: plan.regionList,
      participantsName: plan.participantsName,
      categoryResponseStatus: plan.categoryResponseStatus,
      spotResponseStatus: plan.spotResponseStatus,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
    };
    return Promise.resolve(planDetailResponse);
  }

  async getProfileImage(planId: number) {
    const plan = await this.plansRepository.findOne({
      where: { id: planId },
      relations: ['ParticipantsList'],
    });
    const participantsImage = [];

    for (let i = 0; i < plan.ParticipantsList.length; i++) {
      participantsImage.push(plan.ParticipantsList[i].profileImage);
    }

    return JSON.stringify(participantsImage);
  }

  async getAllPlan(userId: number): Promise<PlanSimpleResponseDto[]> {
    // participant_list에서 user가 포함된 모든 여행 계획 전체 조회하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const plans = await this.plansRepository
      .createQueryBuilder('plans')
      .leftJoinAndSelect('plans.ParticipantsList', 'participants')
      .where('participants.id IN (:...userIds)', { userIds: [user.id] })
      .getMany();

    const planSimpleResponse: PlanSimpleResponseDto[] = [];
    for (let i = 0; i < plans.length; i++) {
      const profileImage = await this.getProfileImage(plans[i].id);
      const planSimple: PlanSimpleResponseDto = {
        planId: plans[i].id,
        userId: plans[i].userId,
        groupNum: plans[i].group_num,
        startDate: plans[i].startDate,
        endDate: plans[i].endDate,
        status: plans[i].status,
        participantsName: plans[i].participantsName,
        profileImg: profileImage,
      };
      planSimpleResponse.push(planSimple);
    }
    return Promise.resolve(planSimpleResponse);
  }
}
