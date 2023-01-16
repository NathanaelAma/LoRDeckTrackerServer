import MatchService from '@/services/match.service';
import { NextFunction, Request, Response } from 'express';
import { dto } from 'galeforce';
import { LorRegion } from 'galeforce/dist/riot-api';

class MatchController {
  public matchService = new MatchService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: 'Hello World', message: 'MatchController' });
    } catch (error) {
      next(error);
    }
  };

  public getMatchList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const region: LorRegion = LorRegion[req.query.region.toString()];
      const puuid: string = req.query.puuid.toString();

      const matchList: string[] = await this.matchService.getMatchList(puuid, region);
      res.status(200).json({ data: matchList });
    } catch (error) {
      next(error);
    }
  };

  public getMatchDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const region: LorRegion = LorRegion[req.query.region.toString()];
      const matchId: string = req.params.matchId;

      const matchData: dto.LorMatchDTO = await this.matchService.getMatchById(matchId, region);
      res.status(200).json({ data: matchData });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
