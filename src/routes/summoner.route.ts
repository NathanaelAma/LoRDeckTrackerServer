import { Router } from 'express';
import SummonerController from '@controllers/summoner.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

/**
 * Class representing the SummonerRoute.
 * @class
 * @implements {Routes}
 */
class SummonerRoute implements Routes {
  public path = '/summoner';
  public router = Router();
  public summonerController = new SummonerController();

  constructor() {
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for summoner-related operations.
   * @private
   */
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.summonerController.getSummoner);
    this.router.post(`${this.path}/add`, authMiddleware, this.summonerController.addSummonerToUser);
  }
}

export default SummonerRoute;
