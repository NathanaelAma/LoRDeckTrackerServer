import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { UserDto, CreateUserDto } from '@dtos/users.dto';
import UsersRoute from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

afterEach(async () => {
  await mongoose.disconnect();
});

describe('Testing Users', () => {
  const created_at: string = new Date().toISOString();
  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          username: 'a',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          username: 'b',
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          username: 'c',
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as mongoose.Mongoose).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        username: 'a',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as mongoose.Mongoose).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        username: 'test',
        email: 'test@email.com',
        password: 'q1w2e3r4',
        created_at,
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: userData.username,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        created_at,
      });

      (mongoose as mongoose.Mongoose).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const updated_at: string = new Date().toISOString();
      const userData: UserDto = {
        username: 'test',
        email: 'test@email.com',
        password: 'q1w2e3r4',
        // updated_at,
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      if (userData.email) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          username: userData.username,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
          updated_at,
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        username: userData.username,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        updated_at,
      });

      (mongoose as mongoose.Mongoose).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userName = 'test';

      const usersRoute: UsersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOneAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: 'test',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as mongoose.Mongoose).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userName}`).expect(200);
    });
  });
});
