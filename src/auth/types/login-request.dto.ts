import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInRequestDto {
  @ApiProperty({
    description: 'The email of the User',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
