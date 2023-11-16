import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('CATEGORY')
@Controller('api/categories')
export class CategoriesController {
  constructor() {}

  @ApiOperation({ summary: '관광지 클래스 종류 조회하기' })
  @Get()
  getCategories() {
    //TODO : 카테고리 목록 조회
  }

  @ApiOperation({ summary: '취향 설문 제출하기' })
  @Post()
  submitCategories() {
    //TODO : 취향 설문 제출하기
    //사용자가 회원가입을 했을수도 있고 안했을 수도 있기 때문에, 둘다 적용 가능한 로직으로 짜야함
  }
}
