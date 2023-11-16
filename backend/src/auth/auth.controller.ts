import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { KakaoAuthGuard } from './kakao-auth.guard';
import { LoggedInGuard } from './logged-in-guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  @ApiOperation({ summary: '로그인 - 로컬' })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '로그인 - 카카오' })
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoLogIn() {
    return;
  }

  @Get('login/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  kakaoLogInRedirect(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  @UseGuards(LoggedInGuard)
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
