import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JoinRequestDto } from 'src/dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user.decorator';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

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
