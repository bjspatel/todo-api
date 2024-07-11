import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'The id of the User',
    type: String,
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: 'The JWT token',
    type: String,
    required: true,
  })
  accessToken: string;

  refreshToken: string;
}
