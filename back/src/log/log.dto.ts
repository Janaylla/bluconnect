import { IsNumber, IsOptional, Min } from 'class-validator';

export class LogSearchDTO {
  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  order: string = 'asc';

  @IsOptional()
  asc: string = 'asc';
}
