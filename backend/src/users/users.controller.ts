import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JoinRequestDto } from 'src/dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user.decorator';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/dto/user.response.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({
    description: '내 정보 조회 성공',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: '로그인이 되어있지 않습니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get()
  getUsers(@User() user: UserResponseDto) {
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiCreatedResponse({
    description: '회원가입 성공',
  })
  @ApiBadRequestResponse({
    description: '이미 존재하는 사용자입니다.',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  @UseGuards(NotLoggedInGuard)
  async postUsers(@Body() body: JoinRequestDto) {
    const result = await this.userService.postUsers(
      body.email,
      body.password,
      body.nickname,
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: '프로필 사진 변경' })
  @Post('profile_image')
  @UseGuards(LoggedInGuard)
  postProfileImage() {
    //TODO : 프로필 사진 업로드
    //수정도 같이 되게하기
  }
}
