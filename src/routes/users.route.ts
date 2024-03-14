import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

/**
 * Represents the UsersRoute class that defines the routes for user-related operations.
 * @class
 * @implements {Routes}
 */

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for user-related operations.
   * @private
   */
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);

    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.get(`${this.path}/:username`, this.usersController.getUserByUserName);

    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);

    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.put(`${this.path}/:username`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);

    //this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    this.router.delete(`${this.path}/:username`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
