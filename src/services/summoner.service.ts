import { RIOT_API_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import GaleforceModule, { dto } from 'galeforce';
import { LeagueRegion } from 'galeforce/dist/riot-api';

class SummonerService {
  public galeforce: GaleforceModule = new GaleforceModule({
    'riot-api': {
      key: RIOT_API_KEY,
    },
  });

  public async getSummonerByName(summonerName: string, region: LeagueRegion): Promise<any> {
    if (isEmpty(summonerName)) throw new HttpException(400, 'summonerName is empty');

    const summoner: dto.SummonerDTO = await this.galeforce.lol.summoner().name(summonerName).region(region).exec();
    return summoner;
  }

  public async getSummonerByPuuid(puuid: string, region: LeagueRegion): Promise<any> {
    if (isEmpty(puuid)) throw new HttpException(400, 'puuid is empty');

    const summoner: dto.SummonerDTO = await this.galeforce.lol.summoner().puuid(puuid).region(region).exec();
    return summoner;
  }
}

export default SummonerService;
