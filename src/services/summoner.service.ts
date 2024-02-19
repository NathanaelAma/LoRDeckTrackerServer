import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LeagueRegion } from '@config';
import galeforce from '@/utils/galeforce';
import summonerModel from '@/models/summoner.model';
import { User } from '@/interfaces/users.interface';
import { RiotRegion } from 'galeforce/dist/riot-api';
import { logger } from '@/utils/logger';

class SummonerService {
  public summoners = summonerModel;

  public async getSummonerByName(summonerName: string, region: LeagueRegion): Promise<dto.SummonerDTO> {
    if (isEmpty(summonerName)) throw new HttpException(400, 'summonerName is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const summoner: dto.SummonerDTO = await galeforce.lol.summoner().name(summonerName).region(region).exec();
    return summoner;
  }

  public async getSummonerByPuuid(puuid: string, region: LeagueRegion | RiotRegion): Promise<dto.AccountDTO | dto.SummonerDTO> {
    if (isEmpty(puuid)) throw new HttpException(400, 'puuid is empty');
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    function isLeagueRegion(region: LeagueRegion | RiotRegion): region is LeagueRegion {
      return Object.values(LeagueRegion).includes(region as LeagueRegion);
    }

    function isRiotRegion(region: LeagueRegion | RiotRegion): region is RiotRegion {
      return Object.values(RiotRegion).includes(region as RiotRegion);
    }

    if (isLeagueRegion(region)) {
      const summoner: dto.SummonerDTO = await galeforce.lol.summoner().puuid(puuid).region(region).exec();
      logger.info(`Summoner: ${summoner}`);
      return summoner;
    } else if (isRiotRegion(region)) {
      const account: dto.AccountDTO = await galeforce.riot.account.account().puuid(puuid).region(region).exec();
      logger.info(account);
      return account;
    } else {
      throw new HttpException(400, 'region is not valid');
    }
  }

  public async addSummonerToUser(summonerName: string, region: LeagueRegion, user: User): Promise<dto.SummonerDTO> {
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
