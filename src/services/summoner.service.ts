import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LeagueRegion } from 'galeforce/dist/riot-api';
import galeforce from '@/utils/galeforce';

class SummonerService {
  public async getSummonerByName(summonerName: string, region: LeagueRegion): Promise<any> {
    if (isEmpty(summonerName)) throw new HttpException(400, 'summonerName is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const summoner: dto.SummonerDTO = await galeforce.lol.summoner().name(summonerName).region(region).exec();
    return summoner;
  }

  public async getSummonerByPuuid(puuid: string, region: LeagueRegion): Promise<any> {
    if (isEmpty(puuid)) throw new HttpException(400, 'puuid is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const summoner: dto.SummonerDTO = await galeforce.lol.summoner().puuid(puuid).region(region).exec();
    return summoner;
  }
}

export default SummonerService;
