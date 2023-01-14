import { Router } from 'express';
import SummonerController from '@controllers/summoner.controller';
import { Routes } from '@interfaces/routes.interface';

class SummonerRoute implements Routes {
  public path = '/summoner/';
  public router = Router();
  public summonerController = new SummonerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.summonerController.getSummoner);
  }
}

export default SummonerRoute;
