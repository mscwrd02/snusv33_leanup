import { ApiHeader } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;
}
