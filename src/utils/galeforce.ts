import { RIOT_API_KEY, NODE_ENV } from '@/config';
import GaleforceModule from 'galeforce';

const defaultGaleforce: GaleforceModule = new GaleforceModule({
  'riot-api': {
    key: RIOT_API_KEY,
  },
});

const debugGalefore: GaleforceModule = new GaleforceModule({
  'riot-api': {
    key: RIOT_API_KEY,
  },
  debug: ['action'],
});

const galeforce = NODE_ENV === 'development' ? debugGalefore : defaultGaleforce;

export default galeforce;
