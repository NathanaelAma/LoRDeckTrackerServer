import { NextFunction, Request, Response } from 'express';
import { dto } from 'galeforce';
import { LorRegion } from '@config';
import LeaderboardService from '@/services/leaderboard.service';

class LeaderboardController {
  public leaderboardService = new LeaderboardService();

  public getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const region: LorRegion = LorRegion[req.query.region.toString()];
      const leaderboard: dto.LorLeaderboardDTO = await this.leaderboardService.getLeaderboard(region);
      res.status(200).json({ data: leaderboard });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
