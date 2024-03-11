import request from 'supertest';
import mongoose from 'mongoose';
import App from '@/app';
import DeckRoute from '@routes/deck.route';
import { CreateUserDto } from '@dtos/users.dto';
import UserModel from '@models/users.model';
import AuthRoute from '@routes/auth.route';

const userId = '658f19b8ec8610ecab82495b';
const userData: CreateUserDto = {
  username: 'example',
  email: 'example@email.com',
  password: 'password',
};
const deckId = '65edb2421a4bb0aae9f8f1ea';

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const deckRoute = new DeckRoute();
      const app = new App([deckRoute]);

      return request(app.getServer()).get(`${deckRoute.path}`).expect(200);
    });
  });
});

describe('Testing decks with auth', () => {
  let authToken: string;
  beforeAll(async () => {
    const authRoute = new AuthRoute();
    const app = new App([authRoute]);
    const loginResponse = await request(app.getServer())
      .post(`${authRoute.path}login`)
      .send({
        ...userData,
      });
    const cookieHeader: String = loginResponse.headers['set-cookie'].toString();
    const tokenRegex = /Authorization=([^;]+);/;
    authToken = cookieHeader.match(tokenRegex)![1];
  });
  describe('Testing getAllDecks', () => {
    describe('[GET] /deck/all', () => {
      it('response statusCode 200', () => {
        const deckRoute = new DeckRoute();
        const app = new App([deckRoute]);

        return request(app.getServer()).get(`${deckRoute.path}/all`).set('Authorization', `Bearer ${authToken}`).expect(200);
      });
    });
  });
  describe('Testing deckById', () => {
    describe('[GET] /deck/created/${deckId}', () => {
      it('response statusCode 200', async () => {
        const deckRoute = new DeckRoute();
        const app = new App([deckRoute]);

        return request(app.getServer()).get(`${deckRoute.path}/created/${deckId}`).set('Authorization', `Bearer ${authToken}`).expect(200);
      });
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
