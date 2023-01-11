import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateSummonerDto {
  @IsString()
  public accountId: string;
  @IsInt()
  public profileIconId: number;
  @IsDateString()
  public revisionDate: number;
  @IsString()
  public name: string;
  @IsString()
  public id: string;
  @IsString()
  public puuid: string;
  @IsInt()
  public summonerLevel: number;
}
