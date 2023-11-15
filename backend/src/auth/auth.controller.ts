import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { KakaoAuthGuard } from './kakao-auth.guard';
import { LoggedInGuard } from './logged-in-guard';

@Controller('api/auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(@Req() req) {
    return req.user;
  }

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

  @Post('logout')
  @UseGuards(LoggedInGuard)
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
