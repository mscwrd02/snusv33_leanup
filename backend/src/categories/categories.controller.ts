import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/entities/Categories';
import { CategoryResponseDto } from 'src/dto/category.response.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { User } from 'src/decorators/user.decorator';

@ApiTags('CATEGORY')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '관광지 클래스 종류 조회하기' })
  @ApiNotFoundResponse({
    description: '관광지 클래스 종류가 존재하지 않습니다',
  })
  @ApiOkResponse({
    description: '관광지 클래스 종류 조회 성공',
    type: Categories,
    isArray: true,
  })
  @Get()
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    if (!categories || !categories.length) throw new NotFoundException();
    console.log(categories);
    return categories;
  }

  @ApiOperation({ summary: '취향 설문 제출하기' })
  @ApiCreatedResponse({
    description:
      '취향 설문 제출 성공 / 마지막 제출의 경우, 장소 추천목록 만들어짐',
  })
  @ApiBadRequestResponse({
    description: '취향 설문 제출 실패',
    type: ErrorResponseDto,
  })
  @UseGuards(LoggedInGuard)
  @Post()
  async submitCategories(@User() user, @Body() body: CategoryResponseDto) {
    await this.categoriesService.submitCategories(user.id, body);
    const isCategoryFormCompleted =
      await this.categoriesService.isCategoryFormCompleted(body.planId);
    if (isCategoryFormCompleted)
      await this.categoriesService.addRecommends(body.planId);
    return 'ok';
  }

  //취향설문제출에서, 모든 사람이 취향 설문을 제출했으면, recommends에 관광지 20개 추가하기
}
