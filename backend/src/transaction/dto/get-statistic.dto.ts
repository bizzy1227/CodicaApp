import { IsNotEmpty, ArrayNotEmpty, IsArray, IsDate } from 'class-validator';

export class GetStatisticDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  categoryIds: number[];

  @IsDate()
  fromPeriod: Date;

  @IsDate()
  toPeriod: Date;
}
