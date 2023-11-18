import { User } from './../decorators/user.decorator';
import { CategoryResponses } from './../entities/CategoryResponses';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PlanDetailResponseDto,
  PlanStatus,
} from 'src/dto/plan.detail.response.dto';
import { Plans } from 'src/entities/Plans';
import { Repository, In } from 'typeorm';
import { PlanSimpleResponseDto } from 'src/dto/plan.simple.response.dto';
import { UserResponseDto } from 'src/dto/user.response.dto';
import { Users } from 'src/entities/Users';
import { PlanRequestDto } from 'src/dto/plan.request.dto';

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
    //TODO : 여행 계획 생성하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const newPlan = new Plans();
    newPlan.userId = userId;
    newPlan.link = btoa(
      userId.toString() + '_' + this.plansRepository.count().toString(), // binary to ASCII
    );
    newPlan.group_num = body.groupNum;
    newPlan.regionList = body.regionList;
    newPlan.categoryParticipations = 0;
    newPlan.spotParticipations = 0;
    newPlan.startDate = body.startDate;
    newPlan.endDate = body.endDate;
    newPlan.status = PlanStatus.READY;
    newPlan.ParticipantsList = [user];

    const savedPlan = await this.plansRepository.save(newPlan);
    const planDetailResponse: PlanDetailResponseDto = {
      planId: savedPlan.id,
      userId: savedPlan.userId,
      link: savedPlan.link,
      groupNum: savedPlan.group_num,
      regionList: savedPlan.regionList,
      categoryParticipants: 0,
      spotParticipants: 0,
      startDate: savedPlan.startDate,
      endDate: savedPlan.endDate,
      status: savedPlan.status,
    };

    return Promise.resolve(planDetailResponse);
  }

  async updatePlan() {
    //TODO : 여행 계획 수정하기
  }

  async deletePlan(planId: number): Promise<void> {
    //TODO : 여행 계획 삭제하기
    await this.plansRepository.delete(planId);
  }

  async getPlanWithId(planId: number): Promise<PlanDetailResponseDto> {
    //TODO : 여행 계획 id로 조회하기
    const plan = await this.plansRepository.findOne({ where: { id: planId } });
    const planDetailResponse: PlanDetailResponseDto = {
      planId: plan.id,
      userId: plan.userId,
      link: plan.link,
      groupNum: plan.group_num,
      regionList: plan.regionList,
      categoryParticipants: plan.categoryParticipations,
      spotParticipants: plan.spotParticipations,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
    };
    return Promise.resolve(planDetailResponse);
  }

  async getPlanWithHashId(hashId: string): Promise<PlanDetailResponseDto> {
    //TODO : 여행 계획 hash id로 조회하기
    const plan = await this.plansRepository.findOne({
      where: { link: atob(hashId) },
    });
    const planDetailResponse: PlanDetailResponseDto = {
      planId: plan.id,
      userId: plan.userId,
      link: plan.link,
      groupNum: plan.group_num,
      regionList: plan.regionList,
      categoryParticipants: plan.categoryParticipations,
      spotParticipants: plan.spotParticipations,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
    };
    return Promise.resolve(planDetailResponse);
  }

  async getAllPlan(userId: number): Promise<PlanSimpleResponseDto[]> {
    //TODO : participant_list에서 userid가 속한 모든 여행 계획 전체 조회하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const plans = await this.plansRepository
      .createQueryBuilder('plans')
      .leftJoinAndSelect('plans.ParticipantList', 'participantList')
      .where('participantList.userId = :userId', { userId: user.id })
      .getMany();

    const planSimpleResponse: PlanSimpleResponseDto[] = [];
    plans.forEach((plan) => {
      planSimpleResponse.push({
        planId: plan.id,
        userId: plan.userId,
        groupNum: plan.group_num,
        startDate: plan.startDate,
        endDate: plan.endDate,
        status: plan.status,
        profileImg: plan.ParticipantsList.map((participant) => {
          return participant.profileImage;
        }),
      });
    });
    return Promise.resolve(planSimpleResponse);
  }
}
