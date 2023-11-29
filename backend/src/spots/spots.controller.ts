import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SpotsService } from './spots.service';
import { SpotMoreRecommendDto } from 'src/dto/spot.more.recommend.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';
import { User } from 'src/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { FormWithHistoryResponseDto } from 'src/dto/form.with.history.response.dto';
import { SpotResponseDto } from 'src/dto/spot.response.dto';

@ApiTags('SPOT')
@Controller('api/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @ApiOperation({ summary: '관광지 설문지 요청하기' })
  @ApiOkResponse({
    description: '관광지 설문지를 받아옴',
    type: FormWithHistoryResponseDto,
  })
  @Get(':planId')
  @UseGuards(LoggedInGuard)
  async getSpotsFormWithHistory(
    @Param('planId') planId: number,
    @User() user,
  ): Promise<FormWithHistoryResponseDto> {
    //recomends 테이블에 연결되어있는 여행계획에 대한 장소 추천 목록을 보내주기
    //사용자가 이미 spot_response에 응답한 기록이 있는 경우 그 정보를 포함해서 보내주기(프론트에서 이어하기 할 수 있게)
    const spotForm = await this.spotsService.getRecommendSpot(+planId);
    const alreadySubmitResponses =
      await this.spotsService.alreadySubmitResponses(+planId, user.id);
    return { spotForm, alreadySubmitResponses };
  }

  @ApiOperation({ summary: '관광지 설문 제출하기' })
  @ApiOkResponse({
    description:
      '관광지 설문 제출 성공 (이미 제출했던 경우 수정, 새로 제출한 경우 생성)',
  })
  @ApiBadRequestResponse({
    description: '관광지 설문 제출 실패',
    type: ErrorResponseDto,
  })
  @Post()
  @UseGuards(LoggedInGuard)
  async submitForm(@User() user, @Body() body: SpotResponseDto) {
    //제출한 관광지 응답을 저장하기
    //관광지 설문 하나마다 요청이 오는걸로 짜면 좋을듯
    await this.spotsService.submitSpotResponse(user.id, body);
    return 'ok';
  }

  @ApiOperation({ summary: '관광지 추천 20개 더 받기' })
  @ApiCreatedResponse({
    description: '관광지 추천이 추가됨',
  })
  @ApiBadRequestResponse({
    description: '관광지 더 추천받기 실패',
    type: ErrorResponseDto,
  })
  @Post('more')
  @UseGuards(LoggedInGuard)
  async getMoreRecommends(@Body() body: SpotMoreRecommendDto) {
    await this.spotsService.addRecommends(body.planId);
    return 'ok';
  }

  @ApiOperation({ summary: '관광지 추천결과 조회하기' })
  @ApiOkResponse({
    description: '관광지 추천결과 조회 성공',
  })
  @ApiBadRequestResponse({
    description: '관광지 추천결과 조회 실패',
    type: ErrorResponseDto,
  })
  @Get('recommend')
  @UseGuards(LoggedInGuard)
  async getRecommend() {
    //지금까지 제출한 관광지 설문을 바탕으로 추천 결과를 보내주기
    // 현재 planId에 속하는 모든 spotResponse의 score를 합산해서 내림차순으로 정렬해서 보내주기
  }
}
