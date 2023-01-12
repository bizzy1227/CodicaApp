import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
