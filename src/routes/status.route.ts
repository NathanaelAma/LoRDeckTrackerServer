import { Router } from 'express';
import StatusController from '@controllers/status.controller';
import { Routes } from '@interfaces/routes.interface';

class UsersRoute implements Routes {
  public path = '/status';
  public router = Router();
  public statusController = new StatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.statusController.getStatus);
  }
}

export default UsersRoute;
