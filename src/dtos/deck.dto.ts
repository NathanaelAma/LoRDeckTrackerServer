import { IsString } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  public encodedDeckString: string;
}
