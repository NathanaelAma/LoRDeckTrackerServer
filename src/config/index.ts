import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, SENTRY_DSN, RIOT_API_KEY } = process.env;

export enum LeagueRegion {
  BRAZIL = 'br1',
  EUROPE_NORTHEAST = 'eun1',
  EUROPE_WEST = 'euw1',
  KOREA = 'kr',
  LATIN_AMERICA_NORTH = 'la1',
  LATIN_AMERICA_SOUTH = 'la2',
  NORTH_AMERICA = 'na1',
  OCEANIA = 'oc1',
  RUSSIA = 'ru',
  TURKEY = 'tr1',
  JAPAN = 'jp1',
}

export enum LorRegion {
  AMERICAS = 'americas',
  EUROPE = 'europe',
  SOUTHEAST_ASIA = 'sea',
}
export enum ValorantRegion {
  ASIA_PACIFIC = 'ap',
  BRAZIL = 'br',
  EUROPE = 'eu',
  KOREA = 'kr',
  LATIN_AMERICA = 'latam',
  NORTH_AMERICA = 'na',
  PBE = 'pbe1',
  ESPORTS = 'esports',
}
