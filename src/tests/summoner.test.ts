import request from 'supertest';
import App from '@/app';
import SummonerRoute from '@routes/summoner.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const summonerRoute = new SummonerRoute();
      const app = new App([summonerRoute]);

      return request(app.getServer()).get(`${summonerRoute.path}`).expect(200);
    });
  });
});
