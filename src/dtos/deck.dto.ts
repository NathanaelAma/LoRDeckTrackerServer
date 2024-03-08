import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  public cardCode: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  public count: number;
}
