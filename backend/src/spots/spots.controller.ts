import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('SPOT')
@Controller('api/spots')
export class SpotsController {
  constructor() {}

  @ApiOperation({ summary: '관광지 설문지 요청하기' })
  @Get('form')
  sendSpotsForm() {
    //해당 여행 계획에 제출한 취향 응답을 바탕으로 일정개수의 관광지 설문지를 만들어서 보내기 (장소 id뿐만 아니라 이미지, 설명도 보내주기)
    //사용자들이 초기에만 설문하는 경우가 아니라, 추가로 설문하는 경우도 고려해서 로직 짜기
  }

  @ApiOperation({ summary: '관광지 설문 제출하기' })
  @Post()
  submitForm() {
    //제출한 관광지 응답을 저장하기
    //관광지 설문 하나마다 요청이 오는걸로 짜면 좋을듯
  }

  @ApiOperation({ summary: '관광지 설문의 제출이력 조회하기' })
  @Get('history')
  getFormHistory() {
    //특정 사용자가 특정 여행계획에 제출한 관광지 응답이 있는지 조회해서, 있다면 리스트로 지금까지의 응답 보내주기
    //사용자가 중간에 설문을 하다가 나갔다 들어온 경우 이어하기 기능을 위해서 필요함
  }

  @ApiOperation({ summary: '관광지 추천결과 조회하기' })
  @Get('recommend')
  getRecommend() {
    //지금까지 제출한 관광지 설문을 바탕으로 추천 결과를 보내주기
  }
}
