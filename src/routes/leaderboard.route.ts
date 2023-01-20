import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import LeaderboardController from '@/controllers/leaderboard.controller';

class LeaderboardRoute implements Routes {
  public path = '/leaderboard';
  public router = Router();
  public leaderboardController = new LeaderboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaderboardController.getStatus);
  }
}

export default LeaderboardRoute;
