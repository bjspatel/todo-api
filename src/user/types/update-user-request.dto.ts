import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({
    description: 'The name of the User',
    type: String,
  })
  name?: string;

  @ApiProperty({
    description: 'The avatar of the User',
    type: String,
  })
  avatar?: string;
}
