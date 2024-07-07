import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The id of the User',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The email of the User',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The name of the User',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The avatar of the User',
    type: String,
  })
  avatar: string;
}
