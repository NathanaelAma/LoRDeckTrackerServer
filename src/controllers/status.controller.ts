import StatusService from '@/services/status.service';
import { NextFunction, Request, Response } from 'express';
import { dto } from 'galeforce';
import { LorRegion } from '@config';

class StatusController {
  public statusService = new StatusService();

  public getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const region: LorRegion = LorRegion[req.query.region.toString()];
      const status: dto.PlatformDataDTO = await this.statusService.getStatus(region);
      res.status(200).json({ data: status });
    } catch (error) {
      next(error);
    }
  };
}

export default StatusController;
