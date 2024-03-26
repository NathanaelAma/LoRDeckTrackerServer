import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  /**
   * Get all users.
   * @route GET /users
   */
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a user by ID.
   * @route GET /users/:id
   * @param id - The ID of the user.
   */
  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a user by username.
   * @route GET /users/username/:username
   * @param username - The username of the user.
   */
  public getUserByUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName: string = req.params.username;
      const findOneUserData: User = await this.userService.findUserByUsername(userName);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new user.
   * @route POST /users
   * @param userData - The data of the user to be created.
   */
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a user.
   * @route PUT /users/username/:username
   * @param username - The username of the user to be updated.
   * @param userData - The updated data of the user.
   */
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName: string = req.params.username;
      const userData: UserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userName, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a user.
   * @route DELETE /users/username/:username
   * @param username - The username of the user to be deleted.
   */
  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName: string = req.params.username;
      const deleteUserData: User = await this.userService.deleteUser(userName);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
