import request from 'supertest';
import App from '@/app';
import ResourceRoute from '@routes/resource.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer()).get(`${resourceRoute.path}`).expect(200);
    });
  });
});
