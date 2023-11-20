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
import { PlanRequestDto } from 'src/dto/plan.request.dto';
import { PlanDetailResponseDto } from 'src/dto/plan.detail.response.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';
import { PlanSimpleResponseDto } from 'src/dto/plan.simple.response.dto';
import { User } from 'src/decorators/user.decorator';

@ApiTags('PLAN')
@Controller('api/plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @ApiOkResponse({
    description: '여행 계획 생성 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '여행 계획 생성 실패',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 생성하기' })
  @Post()
  @UseGuards(LoggedInGuard)
  async createPlan(
    @User() user,
    @Body() body: PlanRequestDto,
  ): Promise<PlanDetailResponseDto> {
    // 여행 계획 생성하기
    const plan = await this.plansService.createPlan(
      user ? user.id : null,
      body,
    );
    if (plan) {
      return plan;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: '여행 계획 수정하기 // 우선 구현 skip함' })
  @Put()
  @UseGuards(LoggedInGuard)
  async updatePlan() {
    //TODO : 여행 계획 수정하기
  }

  @ApiOkResponse({
    description: '여행 계획 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '여행 계획이 존재하지 않습니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 삭제하기' })
  @Delete(':planId')
  @UseGuards(LoggedInGuard)
  async deletePlan(@Param('planId') planId: number): Promise<void> {
    // 여행 계획 삭제하기
    await this.plansService.deletePlan(planId);
  }

  @ApiOkResponse({
    description: '여행 계획 id로 여행 계획 조회 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '여행 계획이 존재하지 않습니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 id로 조회하기 (회원 기준)' })
  @Get('planId/:planId')
  async getPlanWithId(
    @Param('planId') planId: number,
  ): Promise<PlanDetailResponseDto> {
    // 여행 계획 id로 조회하기
    // 현재 상태, 여행 동행인원, 설문 참여인원, 생성자, 참여자 등등 자세히
    const plan = await this.plansService.getPlanWithId(planId);
    if (plan) {
      return plan;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOkResponse({
    description: '여행 계획 링크로 여행 계획 조회 성공',
    type: PlanDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: '여행 계획이 존재하지 않습니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '여행 계획 링크로 조회하기 (비회원 기준)' })
  @Get('hashId/:hashId')
  async getPlanWithHashId(
    @Param('hashId') hashId: string,
  ): Promise<PlanDetailResponseDto> {
    // 여행 계획 link주소로 조회하기
    // 현재 상태, 여행 동행인원, 설문 참여인원, 생성자, 참여자 등등 자세히
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
  @ApiOperation({ summary: '사용자 정보로 사용자가 속한 모든 여행 조회하기' })
  @Get('all')
  @UseGuards(LoggedInGuard)
  getAllPlan(@User() user): Promise<PlanSimpleResponseDto[]> {
    // 내가 속한 모든 여행 조회하기
    // 세부 사항이 아니라, 간단하게 현황과 날짜, 참여하고 있는 사람들의 프사같은 정보
    const planList = this.plansService.getAllPlan(user.id);
    if (planList) {
      return planList;
    } else {
      throw new ForbiddenException();
    }
  }
}
