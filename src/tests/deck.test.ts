import request from 'supertest';
import App from '@/app';
import DeckRoute from '@routes/deck.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const deckRoute = new DeckRoute();
      const app = new App([deckRoute]);

      return request(app.getServer()).get(`${deckRoute.path}`).expect(200);
    });
  });
});
