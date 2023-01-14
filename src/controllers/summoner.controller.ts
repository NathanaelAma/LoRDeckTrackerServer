import SummonerService from '@/services/summoner.service';
import { NextFunction, Request, Response } from 'express';
import { SummonerDTO } from 'galeforce/dist/galeforce/interfaces/dto';
import { LeagueRegion } from 'galeforce/dist/riot-api';
class SummonerController {
  public summonerService = new SummonerService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: 'Hello World', message: 'SummonerController' });
    } catch (error) {
      next(error);
    }
  };

  public getSummoner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const region: LeagueRegion = LeagueRegion[req.query.region.toString()];

      if (req.query.summonerName != undefined) {
        const summonerName: string = req.query.summonerName.toString();
        const summonerData: SummonerDTO = await this.summonerService.getSummonerByName(summonerName, region);
        res.status(200).json({ data: summonerData });
      } else if (req.query.puuid != undefined) {
        const puuid: string = req.query.puuid.toString();
        const summonerData: SummonerDTO = await this.summonerService.getSummonerByPuuid(puuid, region);
        res.status(200).json({ data: summonerData });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default SummonerController;
