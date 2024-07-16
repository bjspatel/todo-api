import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/types/user.dto';

export class AuthDto {
  @ApiProperty({
    description: 'The User profile',
    type: UserDto,
    required: true,
  })
  user: UserDto;

  @ApiProperty({
    description: 'The JWT token',
    type: String,
    required: true,
  })
  accessToken: string;

  refreshToken: string;
}
