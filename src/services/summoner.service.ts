import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LeagueRegion } from '@config';
import galeforce from '@/utils/galeforce';
import summonerModel from '@/models/summoner.model';
import { User } from '@/interfaces/users.interface';

class SummonerService {
  public summoners = summonerModel;

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

  public async addSummonerToUser(summonerName: string, region: LeagueRegion, user: User): Promise<any> {
    if (isEmpty(summonerName)) throw new HttpException(400, 'summonerName is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');
    if (isEmpty(user)) throw new HttpException(400, 'user is empty');

    const summoner: dto.SummonerDTO = await galeforce.lol.summoner().name(summonerName).region(region).exec();
    const summonerExists = await this.summoners.findOne({ summonerId: summoner.id });
    if (!isEmpty(summonerExists))
      throw new HttpException(409, `Summoner with id ${summoner.id} already linked to user with username ${user.username}`);

    await this.summoners.create({ ...summoner, userId: user._id });
    return summoner;
  }
}

export default SummonerService;
