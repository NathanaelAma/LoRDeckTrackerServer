import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import { LorRegion } from '@config';
import galeforce from '@/utils/galeforce';

class StatusService {
  public async getStatus(region: LorRegion): Promise<dto.PlatformDataDTO> {
    if (isEmpty(region)) throw new HttpException(400, 'region is empty');

    const status: dto.PlatformDataDTO = await galeforce.lor.status().region(region).exec();
    return status;
  }
}

export default StatusService;
