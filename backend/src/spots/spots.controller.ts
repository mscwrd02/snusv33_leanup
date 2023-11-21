import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';

@ApiTags('SPOT')
@Controller('api/spots')
export class SpotsController {
  constructor() {}

  @ApiOperation({ summary: '관광지 설문지 요청하기' })
  @Get()
  sendSpotsFormWithHistory() {
    //recomends 테이블에 연결되어있는 여행계획에 대한 장소 추천 목록을 보내주기
    //사용자가 이미 spot_response에 응답한 기록이 있는 경우 그 정보를 포함해서 보내주기(프론트에서 이어하기 할 수 있게)
  }

  @ApiOperation({ summary: '관광지 설문 제출하기' })
  @Post()
  submitForm() {
    //제출한 관광지 응답을 저장하기
    //관광지 설문 하나마다 요청이 오는걸로 짜면 좋을듯
  }

  @ApiOperation({ summary: '관광지 추천 20개 더 받기' })
  @Get('more')
  getMoreRecommends() {
    //recommends 테이블에 취향을 기반으로 관광지 20개 더 추가해주기
  }

  @ApiOperation({ summary: '관광지 추천결과 조회하기' })
  @Get('recommend')
  getRecommend() {
    //지금까지 제출한 관광지 설문을 바탕으로 추천 결과를 보내주기
  }
}
