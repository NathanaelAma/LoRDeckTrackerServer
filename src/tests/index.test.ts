import request from 'supertest';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

afterAll(async () => {
  mongoose.connection.close();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  const indexRoute = new IndexRoute();
  const app = new App([indexRoute]);
  (mongoose as mongoose.Mongoose).connect = jest.fn();
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
  describe('[GET] /profile', () => {
    let authToken: string;
    const userData: CreateUserDto = {
      username: 'example',
      email: 'example@email.com',
      password: 'password',
    };
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
    describe('Testing Authorization', () => {
      describe('No Authorization token', () => {
        it('response statusCode 404', () => {
          return request(app.getServer())
            .get(`${indexRoute.path}profile`)
            .expect(404)
            .then(response => {
              expect(response.body).toEqual(
                expect.objectContaining({
                  message: 'Authentication token missing',
                }),
              );
            });
        });
      });
      describe('Testing wrong Auth Token', () => {
        it('response statusCode 401', () => {
          return request(app.getServer())
            .get(`${indexRoute.path}profile`)
            .expect(401)
            .set('Authorization', `Bearer ${(Math.random() + 1).toString(36).substring(7)}`)
            .then(response => {
              expect(response.body).toEqual(
                expect.objectContaining({
                  message: 'Wrong authentication token',
                }),
              );
            });
        });
      });
    });
  });
});
