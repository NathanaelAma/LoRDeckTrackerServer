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

  regex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.matchController.getMatchList);
    this.router.get(`${this.path}/:matchId(${this.regex})`, this.matchController.getMatchDetail);
  }
}

export default MatchRoute;
