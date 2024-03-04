import { Router } from 'express';
import ResourceController from '@controllers/resource.controller';
import { Routes } from '@interfaces/routes.interface';

class ResourceRoute implements Routes {
  public path = '/resource';
  public router = Router();
  public resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.resourceController.index);
    this.router.get(`${this.path}/bundle`, this.resourceController.getBundle);
    this.router.get(`${this.path}/regionIcon.png`, this.resourceController.getRegionIcon);
    this.router.get(`${this.path}/set`, this.resourceController.getSetDetails);
    this.router.get(`${this.path}/card`, this.resourceController.getCard);
  }
}

export default ResourceRoute;
