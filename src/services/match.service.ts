import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LorRegion } from 'galeforce/dist/riot-api';
import galeforce from '@/utils/galeforce';

class MatchService {
  public async getMatchList(puuid: string, region: LorRegion): Promise<any> {
    if (isEmpty(puuid)) throw new HttpException(400, 'puuid is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const matchList: string[] = await galeforce.lor.match.list().puuid(puuid).region(region).exec();
    return matchList;
  }
  public async getMatchById(matchId: string, region: LorRegion): Promise<any> {
    if (isEmpty(matchId)) throw new HttpException(400, 'MatchId is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const matchData: dto.LorMatchDTO = await galeforce.lor.match.match().matchId(matchId).region(region).exec();
    return matchData;
  }
}

export default MatchService;
