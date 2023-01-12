import { IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTransactionStatisticDto {
  @ApiProperty({ type: () => Number, isArray: true })
  @IsArray()
  categoryIds: number[];

  @ApiProperty({ example: '2023-01-11 09:47:16.909076' })
  @IsDateString()
  fromPeriod: Date;

  @ApiProperty({ example: '2023-01-12 19:47:16.909076' })
  @IsDateString()
  toPeriod: Date;
}
