import request from 'supertest';
import App from '@/app';
import SummonerRoute from '@routes/summoner.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Get summoner by name', () => {
  const summonerName = 'Voltage Hokage';
  const region = 'EUROPE_WEST';
  describe('[GET] /?summonerName=${summonerName}&region=${region}', () => {
    it('response statusCode 200', () => {
      const summonerRoute = new SummonerRoute();
      const app = new App([summonerRoute]);

      return request(app.getServer()).get(`${summonerRoute.path}?summonerName=${summonerName}&region=${region}`).expect(200);
    });
  });
});
