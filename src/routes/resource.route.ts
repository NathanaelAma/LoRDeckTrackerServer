import { Router } from 'express';
import ResourceController from '@controllers/resource.controller';
import { Routes } from '@interfaces/routes.interface';
import IndexController from '@controllers/index.controller';

class ResourceRoute implements Routes {
  public path = '/resource';
  public router = Router();
  public indexController = new IndexController();
  public resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}/bundle`, this.resourceController.getBundle);
  }
}

export default ResourceRoute;
