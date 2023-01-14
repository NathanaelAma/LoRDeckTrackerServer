import { RIOT_API_KEY } from '@/config';
import GaleforceModule from 'galeforce';

const galeforce: GaleforceModule = new GaleforceModule({
  'riot-api': {
    key: RIOT_API_KEY,
  },
});

export default galeforce;
