import { NextFunction, Request, Response } from 'express';
import ResourceService from '@services/resource.service';
import { dto } from 'galeforce';

class ResourceController {
  public resourceService = new ResourceService();

  public getBundle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const version: string = req.query.version.toString();
      const locale: string = req.query.locale.toString();

      const data: dto.LorDataDragonGlobalsDTO = await this.resourceService.getBundle(version, locale);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default ResourceController;
