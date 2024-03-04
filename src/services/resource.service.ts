import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { dto } from 'galeforce';
import galeforce from '@/utils/galeforce';
import { LorDataDragonSetDataDTO } from 'galeforce/dist/galeforce/interfaces/dto';

class ResourceService {
  public async getGlobals(version: string, locale: string): Promise<dto.LorDataDragonGlobalsDTO> {
    if (isEmpty(version)) throw new HttpException(400, 'version is empty');
    if (isEmpty(locale)) throw new HttpException(400, 'locale is empty');

    const bundle: dto.LorDataDragonGlobalsDTO = await galeforce.lor.ddragon.core.globals().version(version).locale(locale).exec();
    return bundle;
  }

  public async getRegionIcon(version: string, locale: string, lorRegion: string): Promise<Buffer> {
    if (isEmpty(version)) throw new HttpException(400, 'version is empty');
    if (isEmpty(locale)) throw new HttpException(400, 'locale is empty');
    if (isEmpty(lorRegion)) throw new HttpException(400, 'lorRegion is empty');

    const regionIcon: Buffer = await galeforce.lor.ddragon.core.art.regionIcon().lorRegion(lorRegion).version(version).locale(locale).exec();
    return regionIcon;
  }

  public async getSetDetails(version: string, locale: string, lorSet: number): Promise<LorDataDragonSetDataDTO[]> {
    if (isEmpty(version)) throw new HttpException(400, 'version is empty');
    if (isEmpty(locale)) throw new HttpException(400, 'locale is empty');
    if (isEmpty(lorSet)) throw new HttpException(400, 'lorSet is empty');

    const setData: LorDataDragonSetDataDTO[] = await galeforce.lor.ddragon.set.data().version(version).locale(locale).lorSet(lorSet).exec();

    return setData;
  }

  public async getCard(version: string, locale: string, lorSet: number, cardId: string): Promise<Buffer> {
    if (isEmpty(version)) throw new HttpException(400, 'version is empty');
    if (isEmpty(locale)) throw new HttpException(400, 'locale is empty');
    if (isEmpty(lorSet)) throw new HttpException(400, 'lorSet is empty');

    const card: Buffer = await galeforce.lor.ddragon.set.card.art.full().version(version).locale(locale).lorSet(lorSet).card(cardId).exec();

    return card;
  }
}

export default ResourceService;
