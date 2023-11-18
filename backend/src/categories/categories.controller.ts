import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
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
      '취향 설문 제출 성공 / 이전에 같은 이름으로 제출한 이력이 있으면 수정됨',
  })
  @ApiBadRequestResponse({
    description: '취향 설문 제출 실패',
    type: ErrorResponseDto,
  })
  @Post()
  async submitCategories(@Req() req, @Body() body: CategoryResponseDto) {
    await this.categoriesService.submitCategories(
      req.user ? req.user.id : null,
      body,
    );

    return 'ok';
  }
}
