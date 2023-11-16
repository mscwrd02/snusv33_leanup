import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
  })
  id: number;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: 'https://s3.amazon.com/image/abc',
    description: '프로필 이미지',
  })
  profileImage: string;
}
