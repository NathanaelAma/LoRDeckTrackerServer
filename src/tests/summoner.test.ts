import request from 'supertest';
import App from '@/app';
import SummonerRoute from '@routes/summoner.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Summoner', () => {
  const summonerName = 'Voltage Hokage';
  const puuid = 'AU8RFQUNUqhx9-i-An0ARACLxbrAqYWvrkWC3IUhRYI5iE5ze7gjI_yRI_0X9tp_lKrHawhpuO2AHQ';
  const region = 'EUROPE_WEST';
  const riotRegion = 'EUROPE';

  const summonerRoute = new SummonerRoute();
  const app = new App([summonerRoute]);
  const summonerService = summonerRoute.summonerController.summonerService;
  describe('Get summoner by name', () => {
    describe('[GET] /?summonerName=${summonerName}&region=${region}', () => {
      it('response statusCode 200', () => {
        return request(app.getServer()).get(`${summonerRoute.path}?summonerName=${summonerName}&region=${region}`).expect(200);
      });
    });
  });

  describe('Missing summoner name or region', () => {
    describe('[GET] /?summonerName=&region=${region}', () => {
      it('response statusCode 400', () => {
        return request(app.getServer()).get(`${summonerRoute.path}?summonerName=&region=${region}`).expect(400);
      });
    });

    describe('[GET] /?summonerName=${summonerName}&region=', () => {
      it('response statusCode 400', () => {
        return request(app.getServer()).get(`${summonerRoute.path}?summonerName=${summonerName}&region=`).expect(400);
      });
    });
  });

  describe('Get summoner by puuid', () => {
    describe('[GET] /?puuid=${puuid}&region=${region}', () => {
      it('response statusCode 200', () => {
        return request(app.getServer()).get(`${summonerRoute.path}?puuid=${puuid}&region=${riotRegion}`).expect(200);
      });
    });
  });
});
