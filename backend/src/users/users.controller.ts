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

@Controller('users')
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
  logIn(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
