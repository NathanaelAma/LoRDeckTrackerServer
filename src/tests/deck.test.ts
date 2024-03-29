import request from 'supertest';
import mongoose from 'mongoose';
import App from '@/app';
import DeckRoute from '@routes/deck.route';
import { UserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

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
  const userData: UserDto = {
    username: 'example',
    email: 'example@email.com',
    password: 'password',
  };
  const deckId = '65edb2491a4bb0aae9f8f1ee';
  const encodedDeckString = 'CEBQGAIFAMJC6BABAMCBGFJUAICAGAQRAICACBIWDQOS4AIBAM4AEAIEAUIQEBADAEHV';
  const deckName: string = (Math.random() + 1).toString(36).substring(7);
  const deckRoute = new DeckRoute();
  const app = new App([deckRoute]);
  const decks = deckRoute.deckController.deckService.decks;
  beforeAll(async () => {
    const authRoute = new AuthRoute();
    const app = new App([authRoute]);
    const loginResponse = await request(app.getServer())
      .post(`${authRoute.path}login`)
      .send({
        ...userData,
      });
    const cookieHeader: string = loginResponse.headers['set-cookie'].toString();
    const tokenRegex = /Authorization=([^;]+);/;
    authToken = cookieHeader.match(tokenRegex)![1]; // needs to be non-null skipcq: JS-0339

    (mongoose as mongoose.Mongoose).connect = jest.fn();
  });
  afterEach(async () => {
    await decks.deleteMany({});
  });
  describe('Testing getAllDecks', () => {
    describe('[GET] /deck/all', () => {
      it('response statusCode 200', () => {
        return request(app.getServer())
          .get(`${deckRoute.path}/all`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message: 'findAll',
              }),
            );
          });
      });
    });
  });
  describe('Testing get deckById', () => {
    describe('[GET] /deck/${deckId}', () => {
      decks.findOne = jest.fn().mockReturnValue({
        _id: '65edb2491a4bb0aae9f8f1ee',
        userId: '658f19b8ec8610ecab82495b',
        deckName: 'testing',
        encodedDeckString: 'CEBQGAIFAMJC6BABAMCBGFJUAICAGAQRAICACBIWDQOS4AIBAM4AEAIEAUIQEBADAEHV',
      });
      it('response statusCode 200', () => {
        return request(app.getServer())
          .get(`${deckRoute.path}/${deckId}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message: 'findOneById',
              }),
            );
          });
      });
    });
  });
  describe('Testing delete deckById', () => {
    describe('[DELETE] /deck/delete?id=${deckId}', () => {
      decks.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '65edb2491a4bb0aae9f8f1ee',
        userId: '658f19b8ec8610ecab82495b',
        deckName: 'testing4',
        encodedDeckString: 'CEBQGAIFAMJC6BABAMCBGFJUAICAGAQRAICACBIWDQOS4AIBAM4AEAIEAUIQEBADAEHV',
      });
      it('response status code 200', () => {
        return request(app.getServer())
          .delete(`${deckRoute.path}/delete?id=${deckId}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message: 'deleted',
              }),
            );
          });
      });
    });
  });
  describe('Testing creating deck', () => {
    describe('[POST] /deck/new?name=${deckName}', () => {
      it('response statusCode 201', () => {
        decks.findOne = jest.fn();
        decks.create = jest.fn().mockReturnValue({
          _id: '65edb2491a4bb0aae9f8f1ee',
          userId: '658f19b8ec8610ecab82495b',
          deckName: 'test',
          encodedDeckString: 'CEBQGAIFAMJC6BABAMCBGFJUAICAGAQRAICACBIWDQOS4AIBAM4AEAIEAUIQEBADAEHV',
        });

        return request(app.getServer())
          .post(`${deckRoute.path}/new?name=${deckName}`)
          .send({ encodedDeckString })
          .set('Authorization', `Bearer ${authToken}`)
          .expect(201)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message: 'created',
              }),
            );
          });
      });
    });
  });
  describe('Testing updating deck', () => {
    describe('[PATCH] /deck/update?id=${deckId}', () => {
      it('response statusCode 200', () => {
        decks.findOne = jest.fn().mockReturnValue({});
        decks.findByIdAndUpdate = jest.fn().mockReturnValue({
          _id: '65edb2491a4bb0aae9f8f1ee',
          userId: '658f19b8ec8610ecab82495b',
          deckName: 'test',
          encodedDeckString: 'CEBQGAIFAMJC6BABAMCBGFJUAICAGAQRAICACBIWDQOS4AIBAM4AEAIEAUIQEBADAEHV',
        });

        return request(app.getServer())
          .patch(`${deckRoute.path}/update?id=${deckId}`)
          .send({ encodedDeckString })
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message: 'updated',
              }),
            );
          });
      });
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
