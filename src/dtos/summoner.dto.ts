import { IsEmail, IsString } from 'class-validator';

export class CreateSummonerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
