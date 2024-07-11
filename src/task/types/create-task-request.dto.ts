import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequestDto {
  @ApiProperty({
    description: 'The name of the Task',
    type: String,
  })
  name: string;
}
