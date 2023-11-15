import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in-guard';

@Controller('api/plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @ApiOperation({ summary: '여행 계획 생성하기' })
  @Post()
  @UseGuards(LoggedInGuard)
  createPlan() {
    //TODO : 여행 계획 생성하기
  }

  @ApiOperation({ summary: '여행 계획 수정하기' })
  @Put()
  @UseGuards(LoggedInGuard)
  updatePlan() {
    //TODO : 여행 계획 수정하기
  }

  @ApiOperation({ summary: '여행 계획 삭제하기' })
  @Delete()
  @UseGuards(LoggedInGuard)
  deletePlan() {
    //TODO : 여행 계획 삭제하기
  }

  @ApiOperation({ summary: '여행 계획 id로 조회하기' })
  @Get()
  getPlan() {
    //TODO : 여행 계획 link주소로 조회하기
    //현재 상태, 여행 동행인원, 설문 참여인원, 생성자, 참여자 등등 자세히
  }

  @ApiOperation({ summary: '내가 속한 모든 여행 조회하기' })
  @Get('all')
  @UseGuards(LoggedInGuard)
  getAllPlan() {
    //TODO : 내가 속한 모든 여행 조회하기
    //세부 사항이 아니라, 간단하게 현황과 날짜, 참여하고 있는 사람들의 프사같은 정보
  }
}
