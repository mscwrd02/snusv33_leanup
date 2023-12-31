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
}
