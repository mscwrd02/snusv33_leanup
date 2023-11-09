import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JoinRequestDto } from 'src/dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @Post()
  async postUsers(@Body() body: JoinRequestDto) {
    await this.userService.postUsers(body.email, body.password, body.nickname);
  }

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
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
