import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { PlanRequenstDto } from 'src/dto/plan.request.dto';
import { PlanDetailResponseDto } from 'src/dto/plan.detail.response.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';
import { PlanSimpleResponseDto } from 'src/dto/plan.simple.response.dto';

@ApiTags('PLAN')
@Controller('api/plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @ApiOkResponse({
    description: '여행 계획 생성 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '잘못된 요청입니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 생성하기' })
  @Post()
  @UseGuards(LoggedInGuard)
  async createPlan(@Body() body: PlanRequenstDto) {
    //TODO : 여행 계획 생성하기
    const plan = await this.plansService.createPlan(
      // 여행지 선택에서 제주도를 선택하긴 하지만 실제 db에는 저장하지 않음
      body.userId,
      body.groupNum,
      body.regionList,
      body.startDate,
      body.endDate,
    );
    if (plan) {
      return plan;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: '여행 계획 수정하기' })
  @Put()
  @UseGuards(LoggedInGuard)
  async updatePlan() {
    //TODO : 여행 계획 수정하기
    // 일단 skip
  }

  @ApiOperation({ summary: '여행 계획 삭제하기' })
  @Delete()
  @UseGuards(LoggedInGuard)
  async deletePlan() {
    //TODO : 여행 계획 삭제하기
    // 일단 skip
  }

  @ApiOkResponse({
    description: '여행 계획 조회 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '잘못된 요청입니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 id로 조회하기' })
  @Get(':id')
  async getPlanWithId(@Param('id') id: number) {
    //TODO : 여행 계획 link주소로 조회하기
    //현재 상태, 여행 동행인원, 설문 참여인원, 생성자, 참여자 등등 자세히
    const plan = await this.plansService.getPlanWithId(id);
    if (plan) {
      return plan;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOkResponse({
    description: '여행 계획 조회 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '잘못된 요청입니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 링크로 조회하기' })
  @Get(':hashId')
  async getPlanWithHashId(@Param('hashId') hashId: string) {
    //TODO : 여행 계획 link주소로 조회하기
    //현재 상태, 여행 동행인원, 설문 참여인원, 생성자, 참여자 등등 자세히
    const plan = await this.plansService.getPlanWithHashId(hashId);
    if (plan) {
      return plan;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOkResponse({
    description: '내가 속한 모든 여행 조회 성공',
    type: PlanSimpleResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: '잘못된 요청입니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '사용자 id로 사용자가 속한 모든 여행 조회하기' })
  @Get('all/:id')
  @UseGuards(LoggedInGuard)
  getAllPlan(@Param('id') id: number) {
    //TODO : 내가 속한 모든 여행 조회하기
    // 세부 사항이 아니라, 간단하게 현황과 날짜, 참여하고 있는 사람들의 프사같은 정보
    const planList = this.plansService.getAllPlan(id);
    if (planList) {
      return planList;
    } else {
      throw new ForbiddenException();
    }
  }
}
