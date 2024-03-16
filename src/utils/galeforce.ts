import { RIOT_API_KEY, NODE_ENV } from '@/config';
import GaleforceModule from 'galeforce';

/**
 * The default Galeforce instance used for making API requests.
 */
const defaultGaleforce: GaleforceModule = new GaleforceModule({
  'riot-api': {
    key: RIOT_API_KEY,
  },
});

/**
 * The debug Galeforce instance used for making API requests with debug logs enabled.
 */
const debugGaleforce: GaleforceModule = new GaleforceModule({
  'riot-api': {
    key: RIOT_API_KEY,
  },
  debug: ['action'],
});

/**
 * The Galeforce instance used based on the current environment.
 * In development environment, debugGaleforce is used, otherwise defaultGaleforce is used.
 */
const galeforce = NODE_ENV === 'development' ? debugGaleforce : defaultGaleforce;

export default galeforce;
