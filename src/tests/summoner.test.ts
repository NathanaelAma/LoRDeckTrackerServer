import request from 'supertest';
import App from '@/app';
import SummonerRoute from '@routes/summoner.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const summonerName = 'Voltage Hokage';
const region = 'EUROPE_WEST';

describe('Get summoner by name', () => {
  describe('[GET] /?summonerName=${summonerName}&region=${region}', () => {
    it('response statusCode 200', () => {
      const summonerRoute = new SummonerRoute();
      const app = new App([summonerRoute]);

      return request(app.getServer()).get(`${summonerRoute.path}?summonerName=${summonerName}&region=${region}`).expect(200);
    });
  });
});

describe('Missing summoner name or region', () => {
  describe('[GET] /?summonerName=&region=${region}', () => {
    it('response statusCode 400', () => {
      const summonerRoute = new SummonerRoute();
      const app = new App([summonerRoute]);

      return request(app.getServer()).get(`${summonerRoute.path}?summonerName=&region=${region}`).expect(400);
    });
  });

  describe('[GET] /?summonerName=${summonerName}&region=', () => {
    it('response statusCode 400', () => {
      const summonerRoute = new SummonerRoute();
      const app = new App([summonerRoute]);

      return request(app.getServer()).get(`${summonerRoute.path}?summonerName=${summonerName}&region=`).expect(400);
    });
  });
});
