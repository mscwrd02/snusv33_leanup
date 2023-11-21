import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanDetailResponseDto } from 'src/dto/plan.detail.response.dto';
import { Plans } from 'src/entities/Plans';
import { Repository } from 'typeorm';
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
    const count = await this.plansRepository.count();

    const newPlan = new Plans();
    newPlan.userId = userId;
    newPlan.link = btoa(userId.toString() + '_' + count.toString()); // binary to ASCII
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
    // 여행 계획 삭제하기
    await this.plansRepository.delete(planId);
  }

  async getPlanWithId(planId: number): Promise<PlanDetailResponseDto> {
    // 여행 계획 plan id로 조회하기
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

  async getParticipantsStatus(planId: number) {
    // 여행 id를 받아서, 동행인원의 이름과, 각각이 취향설문과 여행지 설문을 참여했는지 반환하기
    //{"name":["홍길동", "철수", "짱구"], "categoryResponseStatus" : [true, false, true, true, false], "spotResponseStatus" : [true, false, true, true, false]
    //이거 구현해서, getPlanwithId랑HashId에 정보 추가해서 보내주기
  }

  async getPlanWithHashId(hashId: string): Promise<PlanDetailResponseDto> {
    // 여행 계획 hash id로 조회하기
    const plan = await this.plansRepository.findOne({
      where: { link: hashId },
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
    // participant_list에서 userid가 속한 모든 여행 계획 전체 조회하기
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const plans = await this.plansRepository
      .createQueryBuilder('plans')
      .leftJoinAndSelect('plans.ParticipantsList', 'participants')
      .where('participants.id IN (:...userIds)', { userIds: [user.id] })
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
