import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { AuthService } from './auth.service';
import { Platform } from 'src/entities/common/Platforms';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
      callbackURL: configService.get<string>('KAKAO_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      _json: {
        id,
        properties: { nickname, profile_image: profileImage },
        kakao_account: { email },
      },
    } = profile;

    const user = await this.authService.findOrCreateUser(
      email,
      nickname,
      Platform.KAKAO,
    );
    return done(null, user);
  }
}
