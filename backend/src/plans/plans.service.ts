import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanDetailResponseDto } from 'src/dto/plan.detail.response.dto';
import { Plans } from 'src/entities/Plans';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plans) private plansRepository: Repository<Plans>,
  ) {}

  async createPlan(
    userId: number,
    groupNum: number,
    regionList: string,
    startDate: Date,
    endDate: Date,
  ) {
    //TODO : 여행 계획 생성하기
    // 여행지 선택에서 제주도를 선택하긴 하지만 실제 db에는 저장하지 않음
    return true;
  }

  async updatePlan() {
    //TODO : 여행 계획 수정하기
  }

  async deletePlan() {
    //TODO : 여행 계획 삭제하기
  }

  async getPlanWithId(id: number) {
    //TODO : 여행 계획 id로 조회하기
    return true;
  }

  async getPlanWithHashId(hash: string) {
    //TODO : 여행 계획 hash id로 조회하기
    return true;
  }

  async getAllPlan(id: number) {
    //TODO : 여행 계획 전체 조회하기
    return true;
  }
}
