import { IsDateString, IsInt, IsString } from 'class-validator';

/**
 * Represents the data transfer object for creating a summoner.
 */
export class CreateSummonerDto {
  /**
   * The account ID of the summoner.
   */
  @IsString()
  public accountId: string;

  /**
   * The profile icon ID of the summoner.
   */
  @IsInt()
  public profileIconId: number;

  /**
   * The revision date of the summoner.
   */
  @IsDateString()
  public revisionDate: number;

  /**
   * The name of the summoner.
   */
  @IsString()
  public name: string;

  /**
   * The PUUID (encrypted summoner ID) of the summoner.
   */
  @IsString()
  public puuid: string;

  /**
   * The summoner level of the summoner.
   */
  @IsInt()
  public summonerLevel: number;
}
