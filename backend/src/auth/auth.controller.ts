import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { KakaoAuthGuard } from './kakao-auth.guard';
import { LoggedInGuard } from './logged-in-guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserResponseDto } from 'src/dto/user.response.dto';
import { ErrorResponseDto } from 'src/dto/error.response.dto';

@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  @ApiOperation({ summary: '로그인 - 로컬' })
  @ApiBody({
    schema: {
      example: {
        email: 'abc@gmail.com',
        password: '1234',
      },
    },
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: '로그인 실패',
    type: ErrorResponseDto,
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그인 - 카카오' })
  @ApiCreatedResponse({
    description: '로그인 성공',
    type: UserResponseDto,
  })
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoLogIn() {
    return;
  }

  @Get('login/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  kakaoLogInRedirect(@Req() req, @Res() res) {
    res.redirect(process.env.CALLBACK_URL);
    return req.user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  @UseGuards(LoggedInGuard)
  logOut(@Req() req, @Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
