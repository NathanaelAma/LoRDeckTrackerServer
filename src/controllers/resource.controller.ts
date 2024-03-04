import { NextFunction, Request, Response } from 'express';
import ResourceService from '@services/resource.service';
import { dto } from 'galeforce';

class ResourceController {
  public resourceService = new ResourceService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await res.status(200).json({ message: 'ResourceController' });
    } catch (error) {
      next(error);
    }
  };

  public getBundle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const version: string = req.query.version.toString();
      const locale: string = req.query.locale.toString();

      const data: dto.LorDataDragonGlobalsDTO = await this.resourceService.getGlobals(version, locale);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getRegionIcon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const version: string = req.query.version.toString();
      const locale: string = req.query.locale.toString();
      const lorRegion: string = req.query.region.toString();

      const data: Buffer = await this.resourceService.getRegionIcon(version, locale, lorRegion);

      res.status(200).contentType('image/png').send(Buffer.from(data));
    } catch (error) {
      next(error);
    }
  };

  public getSetDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const version: string = req.query.version.toString();
      const locale: string = req.query.locale.toString();
      const lorSet: number = parseInt(req.query.lorSet.toString());

      const data: dto.LorDataDragonSetDataDTO[] = await this.resourceService.getSetDetails(version, locale, lorSet);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const version: string = req.query.version.toString();
      const locale: string = req.query.locale.toString();
      const lorSet: number = parseInt(req.query.lorSet.toString());
      const cardId: string = req.query.cardId.toString();

      const data: Buffer = await this.resourceService.getCard(version, locale, lorSet, cardId);

      res.status(200).contentType('image/png').send(Buffer.from(data));
    } catch (error) {
      next(error);
    }
  };
}

export default ResourceController;
