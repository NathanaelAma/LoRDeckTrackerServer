import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LorRegion } from '@config';
import galeforce from '@/utils/galeforce';

class LeaderboardService {
  public async getLeaderboard(region: LorRegion): Promise<any> {
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const leaderboard: dto.LorLeaderboardDTO = await galeforce.lor.ranked.leaderboard().region(region).exec();
    return leaderboard;
  }
}

export default LeaderboardService;
