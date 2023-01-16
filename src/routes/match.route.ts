import { Router } from 'express';
import MatchController from '@controllers/match.controller';
import { Routes } from '@interfaces/routes.interface';

class MatchRoute implements Routes {
  public path = '/match';
  public router = Router();
  public matchController = new MatchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.matchController.getMatchList);
    this.router.get(`${this.path}/:matchId`, this.matchController.getMatchDetail);
  }
}

export default MatchRoute;
