import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { Platform } from 'src/entities/common/Platform';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nickname', 'profileImage'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async findOrCreateUser(
    email: string,
    nickname: string,
    platform: Platform,
    profileImage: string,
  ): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'profileImage'],
    });
    if (user) return user;

    await this.usersRepository.save({
      email: email,
      nickname: nickname,
      platform: platform,
      profileImage: profileImage,
    });
    const newUser = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'profileImage'],
    });
    return newUser;
  }

  async googleLogin(profile: any): Promise<Users> {
    if (!profile) {
      throw new Error('No profile from google');
    }

    const { id: googleId, emails, displayName, photos } = profile;
    const email = emails && emails.length > 0 ? emails[0].value : null;
    const nickname = displayName || (profile.name && `${profile.name.givenName} ${profile.name.familyName}`) || 'Google User';
    const profileImage = photos && photos.length > 0 ? photos[0].value : null;

    if (!email) {
      // Or handle this case differently, maybe throw an error or use a default email if your system allows
      throw new Error('Email not provided by Google');
    }

    let user = await this.usersRepository.findOne({ where: { googleId } });
    if (user) {
      return user;
    }

    user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      user.googleId = googleId;
      // Optionally update other fields like nickname or profileImage if they've changed
      user.nickname = nickname;
      user.profileImage = profileImage;
      await this.usersRepository.save(user);
      return user;
    }

    const newUser = this.usersRepository.create({
      email,
      nickname,
      googleId,
      profileImage,
      platform: Platform.GOOGLE, // Assuming Platform.GOOGLE exists in your Platform enum
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
