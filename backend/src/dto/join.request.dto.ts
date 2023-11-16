import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @ApiProperty({
    example: 'abc@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: 'qwer1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public nickname: string;
}
