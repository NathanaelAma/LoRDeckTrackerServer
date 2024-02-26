import { NextFunction, Request, Response } from 'express';
import ResourceService from '@services/resource.service';

class ResourceController {
  public resourceService = new ResourceService();
}

export default ResourceController;
