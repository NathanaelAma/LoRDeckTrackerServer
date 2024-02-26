import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import galeforce from '@/utils/galeforce';

class ResourceService {
  public async getBundle(version: string, locale: string): Promise<dto.LorDataDragonGlobalsDTO> {
    if (isEmpty(version)) throw new HttpException(400, 'version is empty');
    if (isEmpty(locale)) throw new HttpException(400, 'locale is empty');

    const bundle: dto.LorDataDragonGlobalsDTO = await galeforce.lor.ddragon.core.globals().version(version).locale(locale).exec();
    return bundle;
  }
}

export default ResourceService;
